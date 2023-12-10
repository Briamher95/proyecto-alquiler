import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './CarDetail.css'

const CarDetail = () => {

    const { cid } = useParams()
    const [carSelect, setCarSelect] = useState(null)
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/api/cars/" + cid)
            .then(res => res.json())
            .then((result) => setCarSelect(result))

    }, [])

    useEffect(() => {
        if (!isEditing) {
            fetch("http://localhost:3000/api/cars/" + cid)
                .then(res => res.json())
                .then((result) => setCarSelect(result))
        }
    }, [isEditing]);
    
    const handleUpdate = async () => {
        const { _id, ...updateData } = carSelect;
        const formData = new FormData();
        for (let key in updateData) {
            formData.append(key, updateData[key]);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/cars/${cid}`, {
                method: 'PATCH',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setIsEditing(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Hubo un error:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cars/${cid}`, {
                method: 'DELETE',
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

    const handleRent = async () => {
        try{
            const response = await fetch(`http://localhost:3000/api/cars/rent/${cid}`,{
                method: "PATCH",
            })
            const data = await response.json()
            if (response.ok){
                alert(data.message)
                navigate('/')
            } else {
                alert(data.message)
                console.log(data.error)
            }
        }
        catch (error) {
            console.error("Hubo un error:", error )
        }
    }

    return (
        <div className="car-detail">
            {
                carSelect ?
                    <>
                        {carSelect.image && <img src={`http://localhost:3000/${carSelect.image}`} alt={carSelect.modelo} />}
                        {isEditing ? (
                            <>
                                <label>
                                    Seleccionar Imagen: 
                                    <input type="file" onChange={(e) => setCarSelect({ ...carSelect, image: e.target.files[0] })} />
                                </label>
                                <label>
                                    Marca:
                                    <input type="text" value={carSelect.marca} onChange={(e) => setCarSelect({ ...carSelect, marca: e.target.value })} />
                                </label>
                                <label>
                                    Modelo:
                                    <input type="text" value={carSelect.modelo} onChange={(e) => setCarSelect({ ...carSelect, modelo: e.target.value })} />
                                </label>
                                <label>
                                    Año:
                                    <input type="number" value={carSelect.ano} onChange={(e) => setCarSelect({ ...carSelect, ano: e.target.value })} />
                                </label>
                                <label>
                                    Patente:
                                    <input type="text" value={carSelect.patente} onChange={(e) => setCarSelect({ ...carSelect, patente: e.target.value })} />
                                </label>
                                <label>
                                    Precio por Día:
                                    <input type="number" value={carSelect.precioPorDia} onChange={(e) => setCarSelect({ ...carSelect, precioPorDia: e.target.value })} />
                                </label>
                                <label>
                                    Disponible:
                                    <select value={carSelect.disponible} onChange={(e) => setCarSelect({ ...carSelect, disponible: e.target.value === 'true' })}>
                                        <option style = {{backgroundColor: "green"}} value={true}>Sí</option>
                                        <option  style = {{ backgroundColor: "red"}}value={false}>No</option>
                                    </select>
                                </label>
                                <button onClick={handleUpdate}>Guardar</button>
                                <button onClick={() => setIsEditing(false)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <h2>{carSelect.marca} {carSelect.modelo}</h2>
                                <p>Año: {carSelect.ano}</p>
                                <p>Patente: {carSelect.patente}</p>
                                <p>Precio por Día: {carSelect.precioPorDia}</p>
                                <p>Disponible: {carSelect.disponible ? 'Sí' : 'No'}</p>
                                <button onClick={() => setIsEditing(true)}>Editar</button>
                                <button onClick={handleDelete}>Eliminar</button>
                                {carSelect.disponible && <button onClick={handleRent}>Alquilar este auto</button> }

                            </>
                        )}
                    </>
                    :
                    <h2>Cargando</h2>
            }

            <Link to={"/"}> Volver al Inicio </Link>
        </div>
    )
}

export default CarDetail
