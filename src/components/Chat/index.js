import React, { useState } from 'react'
import { sendMessagePublic, sendMessagePrivate } from '../../firebase/initialyApp'
import './Chat.css'

export default function Chat({handler}) {
const [message, setMessage] = useState('')

const submit = (ev) => {
  ev.preventDefault()
  const priority = ev.target.priority.value
  if(priority === 'public'){
    sendMessagePublic({message})
    .then(() => {
      console.log('message sended')
      handler({priority:'public'})
      setMessage('')
    })
  }
  if(priority === 'private'){
    sendMessagePrivate({message})
    .then(() => {
      console.log('message sended')
      handler({priority:'private'})
      setMessage('')
    })
  }
}
return (
  <div>
    <form onSubmit={submit} >
      <div className='radio-button'>
        <input type="radio" value="private" name="priority"  /> privado
        <input type="radio" value="public" name="priority" defaultChecked /> publico
      </div>
      <textarea value={message} onChange={(ev) => {setMessage(ev.target.value)}}></textarea>
      <br></br>
      <button>enviar</button> 
    </form>   
  </div>
)
}
