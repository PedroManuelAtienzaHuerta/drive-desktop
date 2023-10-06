import { LocalFileIdProvider } from '../../shared/application/LocalFileIdProvider';
import { EventHistory } from '../../shared/domain/EventRepository';
import { FilePath } from '../domain/FilePath';
import { FileMovedDomainEvent } from '../domain/events/FileMovedDomainEvent';
import { FileByPartialSearcher } from './FileByPartialSearcher';
import Logger from 'electron-log';

// TODO: find a better name
type WasMovedResult = { result: false } | { result: true; contentsId: string };

export class SameFileWasMoved {
  constructor(
    private readonly fileByPartialSearcher: FileByPartialSearcher,
    private readonly localFileIdProvider: LocalFileIdProvider,
    private readonly eventHistory: EventHistory
  ) {}

  async run(path: FilePath): Promise<WasMovedResult> {
    const fileInDestination = this.fileByPartialSearcher.run({
      path: path.value,
    });

    if (!fileInDestination) {
      Logger.debug('FILE IN DESTINATION DOES NOT EXISTS', path);
      return { result: false };
    }

    const events = await this.eventHistory.search(fileInDestination.contentsId);

    if (events.length === 0) {
      Logger.debug('NO EVENTS FOUND');
      return { result: false };
    }

    const movedEvent = events.find(
      (event) => event instanceof FileMovedDomainEvent
    );

    if (!movedEvent) {
      Logger.debug('MOVED EVENT NOT FOUND');
      return { result: false };
    }

    const trackerId = await this.localFileIdProvider.run(path.value);

    if (trackerId !== movedEvent.toPrimitives().trackerId) {
      Logger.debug('DOES NOT HAVE THE SAME LOCAL ID');
      return { result: false };
    }

    Logger.warn('The file has been moved here');
    return { result: true, contentsId: fileInDestination.contentsId };
  }
}
