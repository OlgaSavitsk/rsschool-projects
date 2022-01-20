import { ICarData } from "@/models/car-model"

export default class Race {
    promises: Set<unknown>

    constructor(public carsData: ICarData) {
        this.promises = new Set()
    }

    async raceAll(promises: any, ids: any): Promise<any> {
        const { success, id, time } = await Promise.race(promises)
        console.log(success)
        if(!success) {
            const failedIndex = ids.findIndex((i: any) => i === id)
            const promissesWithoutFailed = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)]
            const idsWithoutFailed = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, promises.length)]
            return this.raceAll(promissesWithoutFailed, idsWithoutFailed)
        } else {
            const winner = this.carsData.items.find((car) => id === car.id)
            return { ...winner, time: +(time / 1000).toFixed(2) }
        }
       
    }

    async race(action: any): Promise<any> {
        const winner = await this.raceAll([...this.promises.add(action)], this.carsData.items.map((car) => car.id))
        return winner
    }
}