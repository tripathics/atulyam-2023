import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import '../styles/form.scss'
import {auth,db,googleProvider} from '../config/config'
import { ReactComponent as ErrorIcon } from '../media/icons/error.svg'
import { ReactComponent as SucesssIcon } from '../media/icons/sucess.svg'


import {signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
// import styles from '../styles/form.scss';


const SignIn = ({ user, loginUser, logoutUser })  => {
  const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

const handleSignUp=(e)=>{
  e.preventDefault();
 
  let user=null;
  createUserWithEmailAndPassword(auth,email,password)
  .then((credential) =>{
    user = credential.user;
    loginUser(user);

    return updateProfile(credential.user,{
      displayName:email
    })
  })

  .then(() => {
    return setDoc(doc(db, 'users', user.uid), {
        Email: email
    })
  }).then(() => {
    setSuccessMsg('Signup Successfull.');
    setEmail('');
    setPassword('');
    setErrorMsg('');
     
}).catch((error) => {
    setErrorMsg(error.message);
    console.error(error);
})

}
 
const SignUpWithGoogle =()=>{
    
  signInWithPopup(auth, googleProvider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // setSignedUp(true);
  // updateSignInRoutes();
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
}
useEffect(() => {
  if (user.user) history('/profile');
})
 
  return (
    <>
    <div className='MainFormComponent container'>
      <div className='formHeading'>Sign In</div>
      <form className='FormComponent' onSubmit={handleSignUp}>
        <div className='formColumn'>
        <div className="messages">
            {errorMsg && <div className='login-msg error'>
              <div className="icon"><ErrorIcon /></div>
              {errorMsg}
            </div>}

            {successMsg && <div className='login-msg success'>
              <div className="icon">< SucesssIcon/></div>
              {successMsg}
            </div>}


          </div>

      
        
     
        <div className='FormLabel DoubleInputBox'>
            <label htmlFor="email">Username*</label> 
            <input required className='halfInput' id="email" onChange={(e)=> setEmail(e.target.value)} value={email} name="email" type="email" ></input>
        </div>

        <div className='FormLabel DoubleInputBox'>
            <label htmlFor="password">Password*</label>
            <input required className='halfInput' id="password" name="password"  onChange={(e) => setPassword(e.target.value)} value={password} type="password"  ></input>
        </div>
        <div style={{display:"flex",flexDirection:"column" ,alignItems:"center",gap:"10px",justifyContent:"center"}}>
        <div className='sectionHeading'>Or</div>

      
        <button onClick={SignUpWithGoogle} className='signInBtn'>

        <img src="https://img.icons8.com/color/30/null/google-logo.png" alt=""/>
          <p> Sign In With google</p>
          </button>
        </div>
        </div>
        
      
       <button  onClick={handleSignUp} className='submitButton' id="submit">SignIn</button>

      </form>


    </div>
  
    </>
  )
}

export default SignIn