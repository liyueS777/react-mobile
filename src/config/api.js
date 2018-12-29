import fetch from './axios'
export const getCompany = (params) => fetch("POST", "/NVRCT/sevenStarController/getAllCompany", params)