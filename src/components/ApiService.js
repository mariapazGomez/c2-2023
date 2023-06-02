import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const URL = 'https://ipinfo.io/';

const getGeoInfo = async (ipv4) => {
    try {
        const response = await axios.get(`${URL}${ipv4}/geo`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la información:', error);
        throw error;
    }
};

const saveData = async (data) => {
    try {
        const { ip, city, region, country } = data;
        const postData = {ip, city, region, country};

        const response = await axios.post(BASE_URL, postData);
        console.log(response.status)
        return response;
    } catch (error) {
        console.error('Error e', error);
        throw error;
    }
};

export default {
    getGeoInfo,
    saveData
};
