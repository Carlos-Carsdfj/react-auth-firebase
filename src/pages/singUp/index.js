import React, { useState  } from 'react'
import { useHistory } from "react-router-dom";
import { registerUse } from '../../firebase/initAuth'
export default function SingUp() {
  
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault()
    registerUse({ email, password })
    console.log('usuario a crear')
  }

  const handler = () => {
  
    history.push("/")
  }
  return ( 
    <div>
      <form onSubmit={submit}>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} requerid/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} requerid />
        <button>Registrar</button>
        <button onClick={handler}>Regresar</button>
      </form>
    </div>
  )
}
