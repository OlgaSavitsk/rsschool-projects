import ApiServer from "../api/api-garage"

const data =  ApiServer.getCars(1) 

export const state = {
    carsPage: 1,
    data: {},
    winnersPage: 1,
    sortBy: '',
    sortOrder: '',
}