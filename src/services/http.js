import axios from 'axios';
import {BACKEND_URL} from "./const.js"


const http = axios.create({
    baseURL: BACKEND_URL
});

http.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");



http.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    console.log("Error", error)
    if (!expectedError) {
        console.log("An Unexpected error occurs");
    }

    return Promise.reject(error);
})


export default http;