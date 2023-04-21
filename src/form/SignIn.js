import React from 'react'
import '../styles/form.scss'



const SignIn = () => {

const handleSubmit=(e)=>{
  e.preventDefault();

  const data  =  new FormData(e.currentTarget)
  const user = {
    email: data.get('email'),
    password: data.get('password')
  }
  if(user) 
  {
    console.log(user)
  }
}
  return (
    <>
    <div className='MainFormComponent container'>
      <div className='formHeading'>Sign In</div>
      <form className='FormComponent' onSubmit={handleSubmit}>
        <div className='formColumn'>

        <div className='FormLabel DoubleInputBox'>
            <label htmlFor="email">Username*</label> 
            <input required className='halfInput' id="email" name="email" type="email" ></input>
        </div>

        <div className='FormLabel DoubleInputBox'>
            <label htmlFor="password">Password*</label>
            <input required className='halfInput' id="password" name="password" type="password" ></input>
        </div>
        <div style={{display:"flex",flexDirection:"column" ,alignItems:"center",gap:"10px",justifyContent:"center"}}>
        <div className='sectionHeading'>Or</div>

      
        <button className='signInBtn'>

        <img src="https://img.icons8.com/color/30/null/google-logo.png"/>
          <p> Sign In With google</p>
          </button>
        </div>
        </div>
        
      
       <button className='submitButton' id="submit">SignIn</button>

      </form>

    </div>
  
    </>
  )
}

export default SignIn