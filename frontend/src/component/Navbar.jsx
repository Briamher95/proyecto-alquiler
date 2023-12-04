import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onSearch }) => {




    return (

        <>
            <div className='NavBarContainer'>

                <div >
                    <h3>CarsOnFire</h3>
                </div>

                <div className='buscador'>
                    <input type="text" placeholder='Que auto necesitas..' />
                </div>

                <div className='menu'>
                    <Link className="links" to="/contact"><span>Contact</span></Link>
                    <Link to="/crearAuto" className="links">Crear Auto</Link>
                </div>

            </div>

        </>

    );
}

export default NavBar;