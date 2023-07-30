import axiosInstance from '../axios/axios'

//addUser
export const addUser = (values) => {
    return axiosInstance().post("/register", { ...values }, { headers: { "Content-Type": "multipart/form-data" } });
}

export const getUsers=()=>{
    return axiosInstance().get('/user');
}

export const deleteUser=(id)=>{
    return axiosInstance().delete(`/user/${id}`);
}
export const getUserDetails=(id)=>{
    return axiosInstance().get(`/user/${id}`)
}

export const updateUserDetails = (id,values) => {
    return axiosInstance().put(`/user/${id}`, { ...values }, { headers: { "Content-Type": "multipart/form-data" } });
}
