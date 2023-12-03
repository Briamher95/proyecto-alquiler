import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

    
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerForm)
        })

        const data = await response.json()
        console.log(data);
        setMessage(data.message)
        if (response.status === 201){
            navigate("/")
        }

    }


    return (




        <form onSubmit={handleSubmit}>

            <label htmlFor="username" > Ingrese su nombre de usuario: </label>
            <input type="text"
                name="username"
                id="username"
                placeholder="Nombre de Usuario"
                value={registerForm.username}
                onChange={handleChange}
                required
            />


            <label htmlFor="email" > Ingrese su nombre email: </label>
            <input type="email"
                name="email"
                id="email"
                placeholder="cosmefulanito@gmail.com"
                value={registerForm.email}
                onChange={handleChange}
                required />

            <label htmlFor="password" > Ingrese su contraseña: </label>
            <input type="password"
                name="password"
                id="password"
                placeholder="cosme123"
                onChange={handleChange}
                value={registerForm.password}
                minLength="5"
                required
            />

            <button type='submit'>Registrarse</button>
            
            <span>¿Ya tienes una cuenta? <button type="button" onClick={() => navigate('/login')}>Inicia sesión aquí</button></span>

            {message && <p>{message}</p>}

        </form>




    )
}

export default Register