//Importamos firebase/app y aparte lo que necesitamos en esta ocación firebase/auth y firebase/firestore
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
/**************** */

//Configuración que asocia el proyecto firebase previamente creada a esta aplicación
import { firebaseConfig } from './config'
/*********** */




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
/*********** */

//Una vez iniciada el sdk podemos hacer uso de firestore 
const db = firebase.firestore();//Este sera nuestra connexión a la base de datos de firestore 
/************ */

//Recogemos informacion de la collección creada en nuestro firestore ote que ya la collección fue previamente creada
export const  getData = async () =>{
  const querySnapshot = await db.collection("messages").get()
  const messages  = []  
//Accedemos a cada documento en esta colleción
  querySnapshot.forEach((doc) => {
    messages.push({
      id: doc.id, 
      text: doc.data().message,
      name:doc.data().name,
      time:doc.data().time.seconds
    })
  })
  
  return messages.sort((before, after) =>{
    return before.time -after.time
  } )    
}
/******************** */

//Aqui accedemos a una documento  anidada creada con el id de cada usuario asi nos aseguramos 
//de tener los mensajes privados organizados por usuario 
//tenga en cuenta que en firestore se modifico tambien las reglas para dejar
//solamente a los usuarios que tengan el mismo id de la collecion al que desean acceder obtener 
//datos de dicha collección 

export const  getDataPrivate = async () =>{
  const querySnapshot = await db.collection(`private/${firebase.auth().currentUser.uid}/messages`).get()
  const messages  = []  
  try {
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id, 
        text: doc.data().message,
        name:doc.data().name,
        time:doc.data().time.seconds
      })
    });
    return messages.sort((before, after) =>{
      return before.time -after.time
    } )    
  } catch (error) {
    console.log(error)
    return null
  }
   
}
/********** */







// Mandamos datos que podran ser vistos por cualquier usuario loguiado o no
//Todo esto se configuro en las reglas de firestore de nuestro proyecto firebase
export const sendMessagePublic = ({message}) => {
  const user = firebase.auth().currentUser
  const name  = user.displayName ? user.displayName : user.email
  const docData ={
    message,
    name,
    time:firebase.firestore.Timestamp.fromDate(new Date())
  }
  return db.collection("messages").add(docData)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}
/************ */








//Aqui mandamos datos a un documento  creada con el id del usuario 
//dicha collecion solo podra ser accedida por el usuario que la creo 
export const sendMessagePrivate =   ({message}) => {
  
  //En vez de colocar el nombre del usuario actual se comprueba primero 
  //si existe esto es porque correos com hotmail no comparte el numbre del usuario
  //a la aplicacion en cambio con gmail siempre obtendremos dicho nombre 
  const user = firebase.auth().currentUser
  const name  = user.displayName ? user.displayName : user.email
  
  const docData ={
    message,
    name,
    time:firebase.firestore.Timestamp.fromDate(new Date())
    //Tiempo del servidor de firebase utilizado para luego ordenar los documentos por fecha
  }
  /************ */


  
  return db.collection("private") //Collecion principal
  //documento con el id  tenga en cuenta que no puede crear una colleccion dentro de otra 
  //solamente crear un documento y dentro de ese documento se crara la coleccion a parte
  .doc(firebase.auth().currentUser.uid)
  //esta sera la colleción que tendra nuestro documento 
  //tambien se podria crear un array como valor en nuestro documento para 
  //guardar los mensaje e ir agregando mensajes nuevos  pero como queria simular 
  //una aplicación que guardara un gran historial de mensajes guardarlos todos en un documento no 
  //solo lo haria mas pesado para recuperar si no dicho documento  tiene un limite de tamaño permitido 
  // eso lo haria mas dificil de escalar 
  .collection('messages')
  .add(docData)
  .then(() => {
    return 'save successfully'
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}
/*********** */







//Esta funcion es solo  para deslogueaser
export const logoutUser = async() => {
  try {
   await firebase.auth().signOut()
   return true
 } catch (error) {
  console.log('ERROR LOGOUT',error)   
 }
} 
/*************** */








// Necesario para administrar el inicio de sesion con google lo usaremos despues cuando queramos 
// Iniciar con una cuenta de goole
const provider = new firebase.auth.GoogleAuthProvider(); 
/***************** */






// Registro de usuario con Email y contraseña
export const registerUse = async ({ email, password }) => {
 try {
   const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
   return  userCredential;
 } catch (error) {
    return error
 }
}
/****************** */








 //Hacer login con una cuenta mediante correo y contraseña
export const loginUser = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
     return userCredential.user
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('error code:', errorCode )
    console.log('error Message:', errorMessage )
  })
}
/****************** */


//Hacer login con google, no es necesario pasar por un proceso de registro aparte,
//firebase asocia la cuenta a la primera que hace el login
export const loginWithGoogle = () => {
  return firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential
    var token = credential.accessToken
    var user = result.user
    console.log('result user:',user.displayName)
    return token
  }).catch((error) => {
    console.log( error.code )
    console.log( error.message )
  });
}
/****************** */





