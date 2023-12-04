
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearAuto.css';

const CrearAuto = () => {
    const [carData, setCarData] = useState({
        marca: '',
        modelo: '',
        ano: '',
        precioPorDia: '',
        patente: '',
        disponible: true,
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setCarData({ ...carData, image: files[0] });
        } else if (name === 'disponible') {
            
            setCarData({ ...carData, disponible: value === 'true' });
        } else {
            setCarData({ ...carData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in carData) {
            formData.append(key, carData[key]);
        }
        try {
            const response = await fetch('http://localhost:3000/api/cars', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Hubo un error:', error);
        }
    };

    return (
        <div className="crear-auto">
            <h1>Crear Auto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Marca:
                    <input type="text" name="marca" value={carData.marca} onChange={handleChange} required />
                </label>
                <label>
                    Modelo:
                    <input type="text" name="modelo" value={carData.modelo} onChange={handleChange} required />
                </label>
                <label>
                    Año:
                    <input type="number" name="ano" value={carData.ano} onChange={handleChange} required />
                </label>
                <label>
                    Precio por Día:
                    <input type="number" name="precioPorDia" value={carData.precioPorDia} onChange={handleChange} required />
                </label>
                <label>
                    Patente:
                    <input type="text" name="patente" value={carData.patente} onChange={handleChange} required />
                </label>
                <label>
                    Disponible:
                    <select name="disponible" value={carData.disponible} onChange={handleChange}>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </select>
                </label>
                <label>
                    Seleccionar Imagen:
                    <input type="file" name="image" onChange={handleChange} />
                </label>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CrearAuto;