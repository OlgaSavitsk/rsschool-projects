import { defaultFilters, IDefaultFilters } from "../../models/default-filter-model"

export class StorageFilter {
    filterStorage: IDefaultFilters | undefined

    constructor() {}

    public loadFromLocalStorage(): void  {
        const storageData = localStorage.getItem('filters')
        
        const checkStorageData = (data: string | null) => {
            return data
        }
        if(!checkStorageData(storageData)) {
            this.filterStorage = defaultFilters
        } else {
            const data: IDefaultFilters = JSON.parse(storageData!);
            this.filterStorage = data;
        }
    }

    public getData(): IDefaultFilters {
        return JSON.parse(JSON.stringify(this.filterStorage))
    }

    public setData(data: IDefaultFilters): void {
        this.filterStorage = data
        this.saveToStorage()
    }

    public saveToStorage(): void {
        localStorage.setItem('filters', JSON.stringify(this.filterStorage))
    }

    public removeStorage(): void {
        localStorage.removeItem('filters')
    }
}