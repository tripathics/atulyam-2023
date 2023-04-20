import React from 'react'
import '../styles/form.scss'


const SignIn = () => {
  return (
    <>
    <div className='MainFormComponent'>
      
      <div className='formHeading'>Sign In</div>
     

      <form className='FormComponent'>

        <div className='FormLabel DoubleInputBox'>
            <label for="email">Username*</label> 
            <input type="email" ></input>
        </div>

        <div className='FormLabel DoubleInputBox'>
            <label for="email">Password*</label>
            <input type="email" ></input>
        </div>

       <button className='submitButton' id="submit">SignIn</button>
      </form>

    </div>
  
    </>
  )
}

export default SignIn