import { Nullable } from '../../../../../src/apps/shared/types/Nullable';
import {
  File,
  FileAttributes,
} from '../../../../../src/context/virtual-drive/files/domain/File';
import { FileRepository } from '../../../../../src/context/virtual-drive/files/domain/FileRepository';

export class FileRepositoryMock implements FileRepository {
  public readonly allMock = jest.fn();
  public readonly searchByPartialMock = jest.fn();
  public readonly deleteMock = jest.fn();
  public readonly addMock = jest.fn();
  public readonly updateMock = jest.fn();
  public readonly updateContentsAndSizeMock = jest.fn();
  public readonly allSearchByPartialMock = jest.fn();

  all(): Promise<File[]> {
    return this.allMock();
  }
  searchByPartial(partial: Partial<FileAttributes>): Nullable<File> {
    return this.searchByPartialMock(partial);
  }
  delete(id: string): Promise<void> {
    return this.deleteMock(id);
  }
  add(file: File): Promise<void> {
    return this.addMock(file);
  }
  update(file: File): Promise<void> {
    return this.updateMock(file);
  }
  updateContentsAndSize(
    file: File,
    newContentsId: string,
    newSize: number
  ): Promise<File> {
    return this.updateContentsAndSizeMock(file, newContentsId, newSize);
  }
  allSearchByPartial(partial: Partial<FileAttributes>): Promise<File[]> {
    return this.allSearchByPartialMock(partial);
  }
}
