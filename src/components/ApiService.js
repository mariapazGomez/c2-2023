import axios from 'axios';

const BASE_URL = 'https://ipinfo.io/';

const getGeoInfo = async (ipv4) => {
    try {
        const response = await axios.get(`${BASE_URL}${ipv4}/geo`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la información:', error);
        throw error;
    }
};

export default {
    getGeoInfo
};