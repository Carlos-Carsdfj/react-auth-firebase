import React, { useState  } from 'react'
import { useHistory } from "react-router-dom";
import { registerUse } from '../../firebase/initialyApp'
import './Register.css'
export default function Register() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passConfirmed, setPassConfirmed ] = useState('')
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault()
    password === passConfirmed 
      ? registerUse({ email, password })
        .then(res=> {
          res.user && history.push("/")
          res.message && alert(res.message)
         })
      : alert('la contraseña no coincide')
  }
  const handler = () => {
    history.push("/")
  }
  return ( 
    <div>
      <form onSubmit={submit}  className='register-form' >
        <h1>Registro de nuevo usuario    ✏📑 </h1>
        <label htmlFor='email' >Correo Electrónico 📧  </label>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} id='email' requerid='true' />
        <label htmlFor='password' >Contraseña 🤫</label>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} id='password' requerid='true'  />
        <label htmlFor='password2' >Repite tu Contraseña 🤔</label>
        <input type='password' value={passConfirmed} onChange={(e)=>setPassConfirmed(e.target.value)} id='password2' requerid='true'  />
        <div className='button-content'>
          <button>Registrar</button>
          <button onClick={handler}>Regresar</button>
        </div>
      </form>
    </div>
  )
}
