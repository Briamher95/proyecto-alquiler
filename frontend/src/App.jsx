import { Route , Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import { Car, CarDetail } from './screens/index'



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Car/>}/>
        <Route path="/car/:cid" element={<CarDetail/>}/>
      </Routes>

    </>
  )
}

export default App
