import React, { useEffect, useState } from 'react'

const Car = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/cars")
            .then(res => res.json())
            .then(result => setCars(result))
    }, [])
    console.log(cars);

    return (
        <>
            {cars.length !== 0 && cars.map((car) => (
                <div key={car._id}>
                    <h2>{car.marca} {car.modelo}</h2>
                    <p>{car.ano}</p>
                </div>)
            )}
        </>
    )
}

export default Car