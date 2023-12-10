import { Route , Routes } from 'react-router-dom'
import React from 'react'
import { Car, CarDetail, ContactPage, CrearAuto, } from './screens/index'





function App() {


  return (
    <>
      
      <Routes>
        
        <Route path="/" element={<Car/>}/>
        <Route path="/car/:cid" element={<CarDetail/>}/>
        <Route path="/crearauto" element={<CrearAuto/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
    </>
  )
}

export default App
