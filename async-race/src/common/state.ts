import ApiServer from "./api/api"

const data =  ApiServer.getCars('1') 

export const state = {
    carsPage: '1',
    data: {},
    //cars,
    //carsCount,
    winnersPage: 1,
    sortBy: '',
    sortOrder: '',
    animation: {
        id: 0
    }
}

/* export default {
    carsPage: 1,
    //cars,
    //carsCount,
    data,
    winnersPage: 1,
    sortBy: '',
    sortOrder: '',
    animation: {}
} */