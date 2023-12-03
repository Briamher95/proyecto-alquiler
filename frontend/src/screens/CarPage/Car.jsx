import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
                <Link to={"/car/" + car._id} key={car._id}>
                    <img src={`http://localhost:3000/${car.image}`} alt={car.modelo} />
                    <h2>{car.marca} {car.modelo}</h2>
                    <p>{car.ano}</p>
                </Link>)
                
            )}
        </>
    )
}

export default Car