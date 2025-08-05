import axios from "axios"

//Creating an instance
const axiosClient = axios.create({
    baseURL : 'http://localhost:4000',
    withCredentials : true,
    headers :{
        'content-type' : 'application/json'
    }
})

export default axiosClient;