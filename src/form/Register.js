import React from 'react'
import '../styles/form.scss'
import { useState } from 'react'
const Register = () => {

    const [collegeStudent,setCollegeStudent] =  useState(0);
  return (
    <>
        <div className="MainFormComponent">

            <div className='formHeading'>Registration Form For Atulyam 2023</div>
            <form className='FormComponent'>
                {/* basic information  */}

            <div className='formColumn'>
                <h2> Basic Informations</h2>
                <div className='FormLabel DoubleInputBox'> 
                    <div>
                    <label for="firstName">First Name* </label> 
                    <br/>
                    <input className='halfInput' type="text" id="firstName" name="name" />
                    </div>
                    <div>
                    <label for="lastName">Last Name*</label>
                    <br/>
                    <input className='halfInput' type="text" id="lastName"></input>
                    </div>
                </div>

                <div className='FormLabel DoubleInputBox'>
                    <div>
                        <label  for="email">Email*</label>
                        <input className='halfInput' type="email" ></input>
                    </div>

                    <div className='Contact'>
                        <label for="contact">Mobile Number*</label>
                        <input className='halfInput' type="tel" id="contact"></input>
                    </div>

                </div>


                <div className='FormLabel DoubleInputBox '>

                    <div>
                    <label for="address">Address Details*</label>
                    <br/>
                    <input className='FullInput' type="text" id="address"></input>
                    </div>
                </div>
                <br/>

                <div className='FormLabel DoubleInputBox'>
                   
                    <div className='password'>
                        <label  for="password">Create Password*</label>
                        <br/>
                        <input className='halfInput' type="password" id="password"></input>
                    </div>


                    <div className='password'>
                        <label for="ConfirmPassword">Confirm Password*</label>
                        <br/>
                        <input className='halfInput' type="password" id="ConfirmPassword"></input>
                    </div>
                </div>
            </div>


            {/* addtional information */}

            <div className='formColumn'>
                <h2>Additional Information</h2>


                <div className='FormLabel'>
                    <label  for="nitapian">Are You Student of NIT Arunachal Pradesh*</label>
                    
                    <div className="option-group">
                    <div className="option-container">

                        <input className="option-input" checked id="option-1" type="radio" name="options" />
                        <input className="option-input" id="option-2" type="radio" name="options" />
                        
                        <label className="option" for="option-1">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                        <sub>Yes</sub>

                        </span>
                        </label>

                        <label className="option" for="option-2">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                            <sub>No</sub>
                        </span>
                        </label>

                    </div>
                </div>
                   
                </div>


                {/* if yes then  */} 

                <div className='FormLabel'>
                    <label for="rollNo">Enter Your RollNo*</label>
                    <input className='halfInput'  type="text" id="rollNo"></input>
                </div>
                {/* if no : outsiders */}

                <div className='FormLabel'>
                    <label for="collegeName">College Name*</label>
                    <input className='halfInput'  type="text" id="colleName"></input>
                    
                </div>

                <div className='FormLabel DoubleInputBox' >

                    <div className='course'>
                        <label for="Course">Course Details:</label> 
                        <br/>
                        <select className='halfInput'  style={{padding:"4px 12px"}}  name="year"  id="">
                        <option value="BTech">Bechlors of Technology (B Tech)</option>
                        <option value="BSc">Bechlors of Science (BSc)</option> 
                        <option value="BA">Bechlors of Arts (BA)</option> 
                        <option value="Bcom">Bechlors of Commerce (BCom)e</option>
                        <option value ="MTech">Masters of Technology (M Tech)</option>
                        <option value ="MSc">Masters of Science (M Sc)</option>
                        <option value ="MA"> Masters of Arts (MA)</option>
                        <option value ="LLB">  (MA)</option>
                        <option value ="PhD">Doctorate of Philosophy (PhD)</option>
                        </select>
                        
                    </div>

                    <div className='year'>
                        <label for="year">Graduation Year:</label> 
                        <br/>
                        <select className='halfInput'  style={{padding:"4px 12px"}}  name="Graduationyear"  id="">
                        <option value="Forth Year">2023</option>
                        <option value ="Third Year">2024</option>
                        <option value ="Second Year">2025</option>
                        <option value ="First Year">2026</option>
                        </select>
                    </div>

                </div>
 
            </div>
            <button className='submitButton' id="submit">Register</button>

            </form>
        </div>
    </>
  )
}

export default Register