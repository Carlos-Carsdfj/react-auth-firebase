import firebase from 'firebase/app';
import { firebaseConfig } from './config'
import "firebase/firestore";
import "firebase/auth";




//inicar la aplicación con firebase

  //Esto es para evitar que si ya hay una app de firebase iniciada cuando intente iniciar el programa 
  //no falle si no lance un error controlado y asi no nos tumbe  la aplicación
  try{
    firebase.initializeApp(firebaseConfig)
  }catch(error){
    if (!/already exists/.test(error.message)) {
      console.error('Firebase initialization error', error.stack)
    }
  }
  
const db = firebase.firestore();//Este sera nuestra connexión a la base de datos de firestore 

export const  getData = async () =>{
  //Aqui gregamos el nombre de la colleccion  en la Firestore ya previamente creada
  // nota la collección tiene que existir la puedes crear mediante la aplicacion o directamente 
  //desde la firebase en la nube puedes crearla y llenarla de datos si gustas para hacer una pequeña prueba 
  const querySnapshot = await db.collection("messages").get()
  const messages  = []  

  querySnapshot.forEach((doc) => {
    
  messages.push({
    id: doc.id, 
    text: doc.data().message
   })
  });

  return messages    
}






