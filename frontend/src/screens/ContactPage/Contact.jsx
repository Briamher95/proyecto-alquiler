import React, { useState } from 'react'
import "./Contact.css"
import { Link } from 'react-router-dom'

const ContactPage = () => {


    const [userData, setUserData] = useState({})

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
    })

    const [showPersonalData, setShowPersonalData] = useState(false)


    const handleChangeInput = (e) => {

        const { name , value} = e.target

        setFormData({ ...formData, [name]: value })
    
    }
    
    const handleSubmitForm = (e) => {

        e.preventDefault()
        setShowPersonalData(true)
        setUserData(formData)

    }


    return (

        <div className='contact'>
            <form onSubmit={handleSubmitForm} className='formularioUsuario'>

                <h3>Contacto</h3>
                <label htmlFor="nombre">Name:*</label>
                <input type="text"
                    name="nombre"
                    id='nombre'
                    onChange={handleChangeInput}
                    value={formData.nombre}
                    required
                />
                <label htmlFor="email">Email:*</label>
                <input type="email"
                    name="email"
                    id='email'
                    onChange={handleChangeInput}
                    value={formData.email}
                    required
                />
                <label htmlFor="asunto">Detail:*</label>
                <input type="text"
                    name="asunto"
                    id='asunto'
                    onChange={handleChangeInput}
                    value={formData.asunto}
                    required
                />
                <label htmlFor="mensaje">Message:*</label>
                <textarea rows="10" 
                    name="mensaje"
                    id='mensaje'
                    onChange={handleChangeInput}
                    value={formData.mensaje}
                    required />
                <div className='btnContainer'>
                <button className="btn-confirmar" type='submit'>Enviar</button>
                </div>
                <Link to={"/"}> Volver al Inicio </Link>
            </form>

            
            {
                showPersonalData &&
                <div className='personalData'>
                    <h4>Nombre de usuario: {userData.nombre}</h4>
                    <h4>Email: {userData.email}</h4>
                <span><b>Mensaje enviado</b></span>
                </div>
            }
        </div>
    )
}

export default ContactPage
