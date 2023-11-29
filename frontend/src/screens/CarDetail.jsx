import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const CarDetail = () => {

    const { cid } = useParams()
    const [carSelect, setCarSelect] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/api/cars/" + pid)
            .then(res => res.json())
            .then((result) => setCarSelect(result))
    }, [])



    return (
        <>

            {
                carSelect ? 
                <div>
                    <h2>{carSelect.marca} {carSelect.modelo}</h2>
                    <p>Año: {carSelect.ano}</p>
                    <p>Patente: {carSelect.patente}</p>
                    <p>Precio por Día: {carSelect.precioPorDia}</p>
                    <p>Disponible: {car.disponible ? 'Sí' : 'No'}</p>
                </div>
                    :
                    <h2>Cargando</h2>

            }
        </>
    )
}

export default CarDetail