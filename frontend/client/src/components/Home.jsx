import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {

  const {logOut} = useContext(AuthContext)
  return (
    <div>
      <h1>WELCOME TO HOME PAGE</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Home
