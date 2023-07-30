import axiosInstance from '../axios/axios'

//addUser
export const addUser = (values) => {
    return axiosInstance().post("/register", { ...values });
}