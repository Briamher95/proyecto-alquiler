import { Route , Routes } from 'react-router-dom'
import React from 'react'
import Car from "./screens/Car"
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Car/>}/>
        <Route path="/car/:pid" element={<CarDetail/>}/>
      </Routes>

    </>
  )
}

export default App
