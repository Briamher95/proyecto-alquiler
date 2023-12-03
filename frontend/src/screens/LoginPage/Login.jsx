import { useNavigate } from 'react-router-dom'
import React , {useState} from 'react'




const Login = () => {

        const navigate = useNavigate()
        const [loginForm,setLoginForm] = useState({
            email:"",
            password:""
        })

        const [message, setMessage] = useState(null)

        const handleChange = (e) => {
            const {name,value} = e.target;
            setLoginForm({...loginForm,[name] : value})
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            const response = await fetch("http://localhost:3000/api/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginForm)
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

            <label>
                Email
                <input type="email" 
                name="email"
                id="email" 
                placeholder="cosmefulanito@gmail.com"
                value={loginForm.email} 
                onChange={handleChange} 
                required
                />
            </label>

            <label>
                Password
                <input type="password" 
                name="password"
                id="password" 
                placeholder="cosme123"
                value={loginForm.password} 
                onChange={handleChange} 
                required
                />
            </label>

        <button type='subbmit'>Log-In</button>

        <span>¿No tienes una cuenta? <button type="button" onClick={() => navigate('/register')}>Regístrate aquí</button></span>
        

        {message && <p>{message}</p>}
        </form>



    )
}

export default Login