import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Car.css';
import { NavBar } from '../../component';

const Car = () => {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/cars")
            .then(res => res.json())
            .then(result => setCars(result))
    }, [])
    console.log(cars);

    return (
        <>
            <NavBar/>
            <div className='car'>
                <h1 className="title">Elige tu coche: </h1>
                {cars.length !== 0 ?
                    <div className="car-container">
                        {cars.map((car) => (
                            <Link to={"/car/" + car._id} key={car._id} className="car-card">
                                <img src={`http://localhost:3000/${car.image}`} alt={car.modelo} />
                                <h2>{car.marca} {car.modelo}</h2>
                                <p>{car.ano}</p>
                            </Link>)

                        )}
                    </div>
                    :
                    <h2>Cargando</h2>}
            </div>
        </>
    )
}

export default Car