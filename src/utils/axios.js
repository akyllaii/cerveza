import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://cervback.onrender.com'
})

export default instance