import axios from 'axios';

let baseUrl="http://localhost:3500/api/bonus";
export const getNumSicks=()=>{
     return axios.get(`${baseUrl}/getNumUsersSickThisMonth `);
}
 
 