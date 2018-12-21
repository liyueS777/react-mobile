import fetch from './axios'
 export const getCompany = (params) => fetch("POST","http://xp.weilian.cn:8199/NVRCT/sevenStarController/getAllCompany",params)
 