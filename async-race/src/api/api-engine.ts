import { IEngine } from "@/models/engine-model";
import { engine } from "../common/constants/api-constants";

export default class ApiEngine {

    static async startEngine(id: string): Promise<IEngine> {
        return (await fetch(`${engine}?id=${id}&status=started`, {
            method: 'PATCH'
        })).json();
    }

    static async stopEngine(id: string) {
        return (await fetch(`${engine}?id=${id}&status=stopped`, {
            method: 'PATCH'
        })).json()
    }

    static async drive(id: string) {
        const response = await fetch(`${engine}?id=${id}&status=drive`, {
            method: 'PATCH'
        }).catch()
        return response.status !== 200 ? { success: false } : { ...(await response.json())}
    }
}