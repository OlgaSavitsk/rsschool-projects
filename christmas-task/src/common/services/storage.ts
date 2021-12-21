import { defaultFilters, IDefaultFilters } from "../../components/main-toys-container/main-toys-container"

export class StorageFilter {
  static storageFilter: any
    static settingsFilters: IDefaultFilters | undefined

    constructor() {}

    static loadFromLocalStorage() {
        const storageData = localStorage.getItem('filters')
        
        const checkStorageData = (data: string | null) => {
            console.log(data)
            return data
        }
        if(!checkStorageData(storageData)) {
            StorageFilter.settingsFilters = defaultFilters
        } else {
            const data: IDefaultFilters = JSON.parse(storageData!);
            StorageFilter.settingsFilters = data;
            return data
        }
    }

    static getData() {
        return JSON.parse(JSON.stringify(StorageFilter.settingsFilters))
    }

    static setData(data: IDefaultFilters) {
        StorageFilter.settingsFilters = data
        StorageFilter.saveToStorage()
    }

    static saveToStorage() {
        localStorage.setItem('filters', JSON.stringify(StorageFilter.settingsFilters))
    }
}