import { useState, createContext } from 'react'


const ContextMessages = createContext([])


export  function SearchContext ({children}){
    
  const [message, setMessages] = useState([])
  return <ContextMessages.Provider value={{message, setMessages  }}>
      {children}
  </ContextMessages.Provider>


}
export default ContextMessages