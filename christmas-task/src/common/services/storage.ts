import { defaultFilterObject, IFilter } from "../constants/filter-constants"

export class StorageFilter {
    settingsFilters: IFilter | undefined
  static storageFilter: any
    static settingsFilters: IFilter

    constructor() {}

    loadFromLocalStorage() {
        const storageData = localStorage.getItem('filters')
        const checkStorageData = (data: string | null) => {
            return data
        }
        if(!checkStorageData(storageData)) {
            this.settingsFilters = defaultFilterObject
        } else {
            const data: IFilter = JSON.parse(storageData!);
            this.settingsFilters = data;
        }
    }

    getData() {
        return JSON.parse(JSON.stringify(this.settingsFilters))
    }

    static setData(data: IFilter) {
        StorageFilter.settingsFilters = data
        StorageFilter.saveToStorage()
    }

    static saveToStorage() {
        localStorage.setItem('filters', JSON.stringify(this.settingsFilters))
    }
}