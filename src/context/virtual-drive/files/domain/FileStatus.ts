import { EnumValueObject } from '../../../shared/domain/EnumValueObject';
import { InvalidArgumentError } from '../../../shared/domain/InvalidArgumentError';
import { ActionNotPermittedError } from './errors/ActionNotPermittedError';

// Several of our implementations work under the premise that the name of the enum key matches
// the value, it is important that when new elements are included, this rule continues to be followed.
export enum FileStatuses {
  EXISTS = 'EXISTS',
  TRASHED = 'TRASHED',
  DELETED = 'DELETED',
}

export class FileStatus extends EnumValueObject<FileStatuses> {
  constructor(value: FileStatuses) {
    super(value, Object.values(FileStatuses));
  }

  static fromValue(value: string): FileStatus {
    for (const fileStatusValue of Object.values(FileStatuses)) {
      if (value === fileStatusValue.toString()) {
        return new FileStatus(fileStatusValue);
      }
    }

    throw new InvalidArgumentError(`The file status ${value} is invalid`);
  }

  static Exists = new FileStatus(FileStatuses.EXISTS);
  static Trashed = new FileStatus(FileStatuses.TRASHED);
  static Deleted = new FileStatus(FileStatuses.DELETED);

  changeTo(status: FileStatuses): FileStatus {
    if (this.value === 'TRASHED') {
      throw new ActionNotPermittedError('restore from trash');
    }

    if (this.value === 'DELETED') {
      throw new ActionNotPermittedError('restore, file is deleted');
    }

    return new FileStatus(FileStatuses[status]);
  }

  is(status: FileStatuses): boolean {
    return this.value === FileStatuses[status];
  }

  protected throwErrorForInvalidValue(value: FileStatuses): void {
    throw new InvalidArgumentError(`File status ${value} is invalid`);
  }
}
