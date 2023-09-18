import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/todos/1",
    timeout : 1000,
});

instance.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = "";
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        console.log("response", response);
        return response.data.data;
    },
    (error) => {
        console.error(error);
    }
);


export default instance;