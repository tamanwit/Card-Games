import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
  const [registerDetails, setregisterDetails] = useState({
    name: "",
    username: "",
    password : "",
    email : "",
  })
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>navigate('/login')}>Login Page</button> 
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='Enter Name' value={registerDetails.name} onChange={(e)=>setregisterDetails(prev=>({...prev, name: e.target.value}))}/>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder='Enter username' value={registerDetails.username} onChange={(e)=>setregisterDetails(prev=>({...prev, username: e.target.value}))}/>

        <label htmlFor="email">Email</label>
        <input type="text" placeholder='Enter email' value={registerDetails.email} onChange={(e)=>setregisterDetails(prev=>({...prev, email: e.target.value}))}/>

        <label htmlFor="password">Password</label>
        <input type="text" placeholder='Enter password' value={registerDetails.password} onChange={(e)=>setregisterDetails(prev=>({...prev, password: e.target.value}))}/>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
