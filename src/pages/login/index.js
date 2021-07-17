import React, { useState  } from 'react'
import { useHistory } from "react-router-dom";
import { loginUser, loginWithGoogle } from '../../firebase/initialyApp'
import './Login.css'
export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('') 
  const history = useHistory();

  const login = (e) => {
    e.preventDefault()
    loginUser({ email, password })
    .then(user => {
     if(user) {
      history.push("/")
     }
    })
  }
  const googleLogin = (ev) => {
    ev.preventDefault()
    loginWithGoogle()
    .then(token =>{
      if(token) {
      history.push("/")
      }
    })
  
  }
  const handler = () => {
    history.push("/")
  }

  return ( 
    <div>
      <form onSubmit={login} className='form'>
        <h1>Acceso de usuario existente 🖖 🤝  </h1>
        <label htmlFor='email'>Correo Electrónico 💻 🔍  </label>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  id='email' requerid='true'/>
        <label htmlFor='password' >Contraseña 🤔 </label>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} id='password' requerid='true' />
        <div className='button-content' >
          <button  >Login</button>
          <button onClick={handler}>Regresar</button>
        </div>
        <button onClick={googleLogin} className='google-button'>Entrar con google</button> 
      </form >
    </div>
  )
}