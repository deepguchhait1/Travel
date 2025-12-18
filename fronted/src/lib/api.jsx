import axiosInstance from "./axios"

export const showData = async() => {
    const res = await axiosInstance.get('/');
    return res.data;
}
export const addData = async(data) => {
    const isFormData = (typeof FormData !== 'undefined') && (data instanceof FormData);
    let payload = data;
    if (!isFormData && data && typeof data === 'object') {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(k, v);
        });
        payload = fd;
    }
    const res = await axiosInstance.post('/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
}
export const deleteData = async(id) => {
    const res = await axiosInstance.delete(`/${id}`);
    return res.data;
}
export const detailsData = async(id) => {
    const res = await axiosInstance.get(`/${id}`);
    return res.data;
}
export const updateData = async({id,data}) => {
    const res = await axiosInstance.put(`/${id}`,data);
    return res.data;
}