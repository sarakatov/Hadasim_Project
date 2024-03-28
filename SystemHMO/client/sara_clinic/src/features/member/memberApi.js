import axios from 'axios';

let baseUrl="http://localhost:3500/api/members";
export const getAllMembers=()=>{
     return axios.get(baseUrl);
}
export const getMemberById=(id)=>{
    return axios.get(`${baseUrl}/${id}`);
}
export const deleteMember=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)  
}
export const addMember=(member)=>{
    return axios.post(`${baseUrl}`,member);
}
export const updateMember=(member,id)=>{
    return axios.put(`${baseUrl}/${id}`,member);
}