import { ISettingsTree, settingaTree } from '@/models/settings-tree.model';

export default class SettingsStorage {
  static settings: ISettingsTree;

  static loadFromLocalStorage(): void {
    const storageData = localStorage.getItem('settings-tree');
    const checkStorageData = (data: string | null) => data;
    if (!checkStorageData(storageData)) {
      SettingsStorage.settings = settingaTree;
    } else {
      const data: ISettingsTree = JSON.parse(storageData!);
      SettingsStorage.settings = data;
    }
  }

  static getData(): ISettingsTree {
    return JSON.parse(JSON.stringify(SettingsStorage.settings));
  }

  static setData(data: ISettingsTree): void {
    SettingsStorage.settings = data;
    SettingsStorage.saveToStorage();
  }

  static saveToStorage(): void {
    localStorage.setItem('settings-tree', JSON.stringify(SettingsStorage.settings));
  }

  static removeStorage = (): void => {
    localStorage.removeItem('settings-tree');
  };
}
