import { Route , Routes } from 'react-router-dom'
import React from 'react'
import { Car, CarDetail, ControlPanel, CrearAuto, Login, Register } from './screens/index'
import { NavBar } from './component'




function App() {


  return (
    <>
     <div className='prueba1'>
      
      <Routes>
        
        <Route path="/" element={<Car/>}/>
        <Route path="/car/:cid" element={<CarDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/controlpanel" element={<ControlPanel/>}/>
        <Route path="/crearauto" element={<CrearAuto/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
