import React from 'react'
import './styles.css'
import Navbar from '../Navbar'

function HeaderSection() {
  return (
    <div>
      <Navbar />
      <div className='heading'>
        <h1>Get The <span>Right Job</span></h1>
        <h1>You Deserve</h1>
      </div>
      <p>786 jobs & 110 candidates are registeresd</p>
    </div>
  )
}

export default HeaderSection