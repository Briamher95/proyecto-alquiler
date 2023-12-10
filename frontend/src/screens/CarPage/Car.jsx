import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Car.css';
import { NavBar } from '../../component';
import Footer from '../../component/Footer';

const Car = () => {

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/cars")
            .then(res => res.json())
            .then(result => setCars(result))
    }, [])
    console.log(cars);

    const filterCars = (search) => {
        return cars.filter(car => car.marca.toLowerCase().includes(search.toLowerCase()) || car.modelo.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <>
            <div className='app'>
                <NavBar search={search} setSearch={setSearch} />
                <div className='car'>
                    <h1 className="title">Nuestros autos... </h1>
                    {cars.length !== 0 ?
                        <div className="car-container">
                            {filterCars(search).map((car) => (
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
                <div className='footer'>
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default Car