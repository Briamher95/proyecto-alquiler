import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FaFire } from 'react-icons/fa';

const NavBar = ({ search, setSearch}) => {


    return (

        <>
            <div className='NavBarContainer'>

                <div >
                    <h3> <FaFire size={32} color="red" />CarsOnFire</h3>
                </div>

                <div className='buscador'>
                    <input type="text" placeholder='Que auto necesitas..' value={search}  onChange={(e)=> setSearch(e.target.value)}/>
                </div>

                <div className='menu'>
                    <Link className="home" to="/"><span>Autos</span></Link>
                    <Link className="links" to="/contact"><span>Contacto</span></Link>
                    <Link to="/crearAuto" className="links">Crear Auto</Link>
                </div>

            </div>

        </>

    );
}

export default NavBar;