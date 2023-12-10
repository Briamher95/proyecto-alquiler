import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaFire } from 'react-icons/fa';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3><FaFire size={32} color="red" />CarsOnFire</h3>
                <p>El mejor sitio para encontrar tu coche ideal.</p>
                <ul className="socials">
                    <li><a href="#"><FaFacebookF size="2em" color="#3b5998" /></a></li>
                    <li><a href="#"><FaTwitter size="2em" color="#1da1f2" /></a></li>
                    <li><a href="#"><FaInstagram size="2em" color="#e1306c" /></a></li>
                    <li><a href="#"><FaLinkedinIn size="2em" color="#0077b5" /></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>Todos los derechos reservados &copy; {year}</p>
            </div>
        </footer>
    );
};

export default Footer;