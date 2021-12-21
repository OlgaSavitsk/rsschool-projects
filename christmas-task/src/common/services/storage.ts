import { defaultFilters, IDefaultFilters } from "../../components/main-toys-container/main-toys-container"

export class StorageFilter {
  //static storageFilter: any
    filterStorage: IDefaultFilters | undefined

    constructor() {}

    loadFromLocalStorage() {
        const storageData = localStorage.getItem('filters')
        
        const checkStorageData = (data: string | null) => {
            console.log(data)
            return data
        }
        if(!checkStorageData(storageData)) {
            this.filterStorage = defaultFilters
        } else {
            const data: IDefaultFilters = JSON.parse(storageData!);
            this.filterStorage = data;
            //return data
        }
    }

     getData() {
        return JSON.parse(JSON.stringify(this.filterStorage))
    }

     setData(data: IDefaultFilters) {
        this.filterStorage = data
        this.saveToStorage()
    }

     saveToStorage() {
        localStorage.setItem('filters', JSON.stringify(this.filterStorage))
    }

    removeStorage() {
        localStorage.removeItem('filters')
    }
}