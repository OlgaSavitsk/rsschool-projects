import { defaultFilters, IDefaultFilters } from '@/models/default-filter-model';
import { ISettingsTree } from '@/models/settings-tree.model';
import { settingaTree } from '../constants/constants';

interface IObjectKeys {
  [key: string]: string[] | IDefaultFilters | ISettingsTree;
}

interface StorageOptions extends IObjectKeys {
  fovourite: string[],
  filters: IDefaultFilters,
  settings: ISettingsTree,
}

const STORAGE_OPTIONS: StorageOptions = {
  fovourite: [],
  filters: defaultFilters,
  settings: settingaTree,
};

export default class StorageService {
  public favouritseSet!: string[] | IDefaultFilters | ISettingsTree;

  private readonly useLocalStorage: boolean = false;

  constructor() {
    this.useLocalStorage = this.storageAvailable('localStorage');
  }

  private storageAvailable(type: string): boolean {
    let storage;
    try {
      storage = (window)[type as keyof Window];
      const key = '__storage_test__';
      storage.setItem(key, key);
      storage.removeItem(key);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        e.code === 22
            || e.code === 1014
            || e.name === 'QuotaExceededError'
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            && (storage && storage.length !== 0);
    }
  }

  public loadFromLocalStorage<T extends string[]>(name: string): void {
    const storageData = this.getItem(name);
    const checkStorageData = (data: string | null | undefined) => data;
    if (!checkStorageData(storageData)) {
      this.favouritseSet = STORAGE_OPTIONS[name];
    } else {
      const data: T = JSON.parse(storageData!);
      this.favouritseSet = data;
    }
  }

  private getItem(name: string): string | null | undefined {
    if (this.useLocalStorage) {
      const storageData = localStorage.getItem(name);
      return storageData;
    }
  }

  public getData(): any {
    return JSON.parse(JSON.stringify(this.favouritseSet));
  }

  public setData<T extends string[] | IDefaultFilters | ISettingsTree>(data: T): void {
    this.favouritseSet = data;
  }

  public saveToStorage(name: string): void {
    localStorage.setItem(name, JSON.stringify(this.favouritseSet));
  }

  public removeStorage(name: string): void {
    localStorage.removeItem(name);
  }
}
