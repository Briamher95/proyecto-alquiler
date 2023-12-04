import { Link, useParams, useNavigate  } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

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

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cars/${cid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carSelect),
            });

            const data = await response.json();

            if (response.ok) {
                alert( data.message);
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
                alert( data.message);
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Hubo un error:', error);
        }
    };

    return (
        <>
            {
                carSelect ?
                    <div>
                        {carSelect.image && <img src={`http://localhost:3000/${carSelect.image}`} alt={carSelect.modelo} />}
                        {isEditing ? (
                            <>
                                <input type="text" value={carSelect.marca} onChange={(e) => setCarSelect({...carSelect, marca: e.target.value})} />
                                <input type="text" value={carSelect.modelo} onChange={(e) => setCarSelect({...carSelect, modelo: e.target.value})} />
                                <input type="number" value={carSelect.ano} onChange={(e) => setCarSelect({...carSelect, ano: e.target.value})} />
                                <input type="text" value={carSelect.patente} onChange={(e) => setCarSelect({...carSelect, patente: e.target.value})} />
                                <input type="number" value={carSelect.precioPorDia} onChange={(e) => setCarSelect({...carSelect, precioPorDia: e.target.value})} />
                                <select value={carSelect.disponible} onChange={(e) => setCarSelect({...carSelect, disponible: e.target.value})}>
                                    <option value={true}>Sí</option>
                                    <option value={false}>No</option>
                                </select>
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
                            </>
                        )}
                    </div>
                    :
                    <h2>Cargando</h2>
            }
            
            <Link to={"/"}> Volver al Inicio </Link>
        </>
    )
}

export default CarDetail