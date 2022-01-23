import { IDriveModeModel, IEngineModel } from "@/models/engine-model";
import { engine } from "../common/constants/api-constants";

export default class ApiEngine {

    static async startEngine(id: string): Promise<IEngineModel> {
        const response = await fetch(`${engine}?id=${id}&status=started`, {
            method: 'PATCH'
        })
        if(response.status === 400) {
            throw new Error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive".')
        }
        if(response.status === 404) {
            throw new Error('Car with such id was not found in the garage.')
        } 
        return response.json()
    }

    static async stopEngine(id: string): Promise<IEngineModel> {
        return (await fetch(`${engine}?id=${id}&status=stopped`, {
            method: 'PATCH'
        })).json()
    }

    static async drive(id: string): Promise<IDriveModeModel> {
        const response = await fetch(`${engine}?id=${id}&status=drive`, {
            method: 'PATCH'
        }).catch()
        if(response.status === 500) {
            throw new Error('Car has been stopped suddenly. It\'s engine was broken down.')
        }
        if(response.status === 429) {
            throw new Error('Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.')
        } 
        if(response.status === 404) {
            throw new Error('Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?')
        }
        if(response.status === 400) {
            throw new Error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive".')
        }
        return response.status !== 200 ? { success: false } : { ...(await response.json())}
    }
}