import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: "AIzaSyCX0vSgsyWDyQ5T6ASNY1MtXIUKQuiXUtU",
  authDomain: "netflix-clone-1cc91.firebaseapp.com",
  projectId: "netflix-clone-1cc91",
  storageBucket: "netflix-clone-1cc91.firebasestorage.app",
  messagingSenderId: "227954364461",
  appId: "1:227954364461:web:92daeb38d69eb3579ce8a4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name, email, password) => {
   try{
   const res = await createUserWithEmailAndPassword(auth, email, password);

   const user = res.user;
   await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
   })
   }catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}


const login = async (email, password) => {
   try{
    await signInWithEmailAndPassword(auth, email, password)
   }catch(error){
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}


const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}