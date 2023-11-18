import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_API_URL || "",
});

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axios;
