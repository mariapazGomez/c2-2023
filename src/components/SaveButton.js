import React, { useState } from 'react';
import ApiService from "./ApiService";

const SaveButton = ({ data }) => {

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        try {
            const response = await ApiService.saveData(data);

            if (response.status === 201) {
                setSaveSuccess(true);
            } else {
                setSaveError("Error al guardar los datos. Intente nuevamente.");
            }
        } catch (error) {
            setSaveError("Error al guardar los datos. Intente nuevamente.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <button onClick={handleSave} disabled={isSaving}>
                Guardar
            </button>
            {isSaving && <p>Guardando datos...</p>}
            {saveError && <p>{saveError}</p>}
            {saveSuccess && <p>Datos guardados correctamente</p>}
        </div>
    );
};

export default SaveButton;
