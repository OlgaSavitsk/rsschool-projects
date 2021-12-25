export default class StorageFavorite {
    static favoritseSet: string[];
    constructor() {}
  
    static loadFromLocalStorage(): void {
      const storageData = localStorage.getItem('favorite');
      const checkStorageData = (data: string | null) => data;
      if (!checkStorageData(storageData)) {
        StorageFavorite.favoritseSet = [];
      } else {
        const data: string[] = JSON.parse(storageData!);
        StorageFavorite.favoritseSet = data;
      }
    }
  
    static getData(): string[] {
      return JSON.parse(JSON.stringify(StorageFavorite.favoritseSet));
    }
  
    static setData(data: string[]): void {
        StorageFavorite.favoritseSet = data;
        StorageFavorite.saveToStorage();
    }
  
    static saveToStorage(): void {
      localStorage.setItem('favorite', JSON.stringify(StorageFavorite.favoritseSet));
    }
  
    static removeStorage = (): void => {
      localStorage.removeItem('favorite');
    };
  }