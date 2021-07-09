
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../firebase/initialyApp'

function Home() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    getData().then(messages => setMessages(messages))  
  }, [])

  return (
    <main className="App">
      <Link to='/singUp' >Registrar</Link>
      <h1>Bienvenido a la pagina principal 👨  👩  </h1>

      <section>
        {
          messages.map(message => <h2 key={message.id}>{message.text}</h2>)
        }
      </section>
    </main>
  )
}

export default Home;
