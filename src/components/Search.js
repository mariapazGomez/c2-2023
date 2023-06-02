import React, { useState } from 'react';
import ApiService from "./ApiService";
import SaveButton from "./SaveButton";

const getDummyGeoInfo = (ipv4) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dummyData = {
                ip: ipv4,
                city: 'Ciudad Dummy',
                region: 'Región Dummy',
                country: 'País Dummy',
                loc: 'Ubicación Dummy',
                org: 'Proveedor Dummy',
                postal: 'Código Postal Dummy',
                timezone: 'Zona Horaria Dummy',
            };
            resolve(dummyData);
        }, 1000);
    });
};

const Search = () => {
    const [ipv4, setIPv4] = useState('');
    const [geoInfo, setGeoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidIPv4, setIsValidIPv4] = useState(true);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setIPv4(inputValue);
        setIsValidIPv4(validateIPv4(inputValue));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!isValidIPv4) {
                return;
            }
            // const data = await ApiService.getGeoInfo(ipv4);
            const data = await getDummyGeoInfo(ipv4);
            setGeoInfo(data);
        } catch (error) {
            setError("Error al obtener la información");
        } finally {
            setIsLoading(false);
        }
    };

    const validateIPv4 = (value) => {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(value);
    };

    return (
        <div>
            <input type="text" value={ipv4} onChange={handleInputChange} placeholder="Ingrese una dirección IPv4" />
            {!isValidIPv4 && <p>Formato de dirección IPv4 no válido</p>}
            <button onClick={handleSearch} disabled={isLoading || !ipv4 || !isValidIPv4}>
                Buscar
            </button>
            {isLoading ? (
                <p>Cargando información...</p>
            ) : error ? (
                <p>{error}</p>
            ) : geoInfo ? (
                <div>
                    <p>IP: {geoInfo.ip}</p>
                    <p>Ciudad: {geoInfo.city}</p>
                    <p>Región: {geoInfo.region}</p>
                    <p>País: {geoInfo.country}</p>
                    <p>Ubicación: {geoInfo.loc}</p>
                    <p>Proveedor de Internet: {geoInfo.org}</p>
                    <p>Código Postal: {geoInfo.postal}</p>
                    <p>Zona Horaria: {geoInfo.timezone}</p>
                    <SaveButton data={geoInfo} />
                </div>
            ) : null}
        </div>
    );
};

export default Search;
