import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../Components/LandingPage'

function Navs() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Navs