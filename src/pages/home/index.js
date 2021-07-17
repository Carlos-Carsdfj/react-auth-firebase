
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData, getDataPrivate, logoutUser } from '../../firebase/initialyApp'
import Chat from '../../components/Chat/index'
import firebase from "firebase"
import './Home.css'

function Home() {
  const [messages, setMessages] = useState([])
  const [mesgPrivate, setMsgPrivate] = useState([])
  const [ isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    getData().then( messages =>{
      firebase.auth().currentUser && setIsLogin(true)
      setMessages(messages)
    }) 
    isLogin && getDataPrivate()
    .then(messages => {
      if(messages == null){
        return null
      }
      setMsgPrivate(messages)
    })
  }, [isLogin])

  const logout = () =>{
    logoutUser().then(setIsLogin(false))
  }

  const reCall = ({priority})=>{
    priority === 'public' 
      ? getData().then( messages =>{
          setMessages(messages)})  
      :  getDataPrivate()
        .then(messages => {
          if(messages == null){
            return null
          }
          setMsgPrivate(messages)})
  }
  return (
    <>
      <header>
      {
        isLogin 
          ? <button className='button' onClick={logout}>Logout</button> 
          : <>
              <Link to='/register'  className='link' >Registrar</Link> 
              <Link to='/login' className='link' >login</Link>
            </>
      }
      </header>
      <main className="App">
        <h1>Bienvenido a la pagina principal 👨  👩  </h1>
        <section className='messages-containt'>  
          <article className='messages-public'>
          <h2>Mensajes publicos</h2>  
            {
              messages.map((message) => {
                return <p key={message.id}>{message.name}: <span >{message.text}</span> </p>
              })
            }
          </article>
          {isLogin 
            ? <article className='messages-private'>
                <h2>Mensajes privados</h2>  
                  {
                    mesgPrivate.map((message) => {
                     return <p key={message.id}>{message.name}: <span >{message.text}</span> </p>
                    })
                  }
              </article>
            : null  
          }
        </section>  
        {isLogin && <Chat handler={reCall}/>}
      </main>
    </>
  )
}

export default Home
