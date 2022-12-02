import React, { useContext } from 'react'
import './styles.css'
import Navbar from '../Navbar'
import { UserContext } from '../context/UserContext';

function HeaderSection() {
  const [state, dispatch] = useContext(UserContext)
  const userInfo = state.user;
  // if(userInfo){
  //   console.log(userInfo)
  // }else {
  //   console.log('NO')
  // }
  return (
    <div>
      <Navbar />
      <br/> <br/>
      <div className='heading'>
        <h1>Get The <span>Right Job</span></h1>
        <h1>You Deserve</h1>
      </div>
      <p>786 jobs & 110 candidates are registeresd</p>
    </div>
  )
}

export default HeaderSection