import React, { useState } from 'react';
import ApiService from './ApiService';

// Función dummy para simular la respuesta del API
const getDummyGeoInfo = (ipv4) => {
    return new Promise((resolve) => {
        // Simulación de un retardo de 1 segundo
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
    const [error, setError] = useState('');
    const [isValidIP, setIsValidIP] = useState(true);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setIPv4(value);
        setIsValidIP(validateIP(value));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setError('');

        try {
            //const data = await ApiService.getGeoInfo(ipv4);
            const data = await getDummyGeoInfo(ipv4);
            setGeoInfo(data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');

        try {
            await ApiService.saveData(geoInfo);
            setError('¡Guardado correctamente!');
        } catch (error) {
            setError('Error al guardar. Intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateIP = (ip) => {
        // Expresión regular para validar una dirección IPv4
        const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        return regex.test(ip);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="d-flex align-items-center mb-3">
                        <h2>Buscar Información de IP</h2>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese una dirección IPv4"
                            value={ipv4}
                            onChange={handleInputChange}
                        />
                        {!isValidIP && <p className="text-danger">Formato de dirección IPv4 inválido</p>}
                        <button className="btn btn-primary" onClick={handleSearch} disabled={isLoading || !ipv4 || !isValidIP}>
                            Buscar
                        </button>
                    </div>
                    {isLoading && <p>Cargando información...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {geoInfo && (
                        <div>
                            <h3>Información de IP:</h3>
                            <p>IP: {geoInfo.ip}</p>
                            <p>Ciudad: {geoInfo.city}</p>
                            <p>Región: {geoInfo.region}</p>
                            <p>País: {geoInfo.country}</p>
                            <p>Ubicación: {geoInfo.loc}</p>
                            <p>Proveedor de Internet: {geoInfo.org}</p>
                            <p>Código Postal: {geoInfo.postal}</p>
                            <p>Zona Horaria: {geoInfo.timezone}</p>
                            <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
                                Guardar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
