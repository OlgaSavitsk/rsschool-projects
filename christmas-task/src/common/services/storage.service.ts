import { defaultFilters, IDefaultFilters } from '@/models/default-filter-model';
import { ISettingsTree, settingaTree } from '@/models/settings-tree.model';

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

  public loadFromLocalStorage<T extends string[]>(name: string): void {
    const storageData = localStorage.getItem(name);
    const checkStorageData = (data: string | null) => data;
    if (!checkStorageData(storageData)) {
      this.favouritseSet = STORAGE_OPTIONS[name];
    } else {
      const data: T = JSON.parse(storageData!);
      this.favouritseSet = data;
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
