import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL:' https://life-sesson-server-4u7xmykxo-rising-star1.vercel.app',

})
const useAxios = () => {
    return axiosSecure
};

export default useAxios;