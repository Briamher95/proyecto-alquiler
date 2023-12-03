import { Route , Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import { Car, CarDetail, Register } from './screens/index'





function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Car/>}/>
        <Route path="/car/:cid" element={<CarDetail/>}/>
{/*         <Route path="/login" element={<Login/>}/> */}
        <Route path="/register" element={<Register/>}/>
      </Routes>

    </>
  )
}

export default App
