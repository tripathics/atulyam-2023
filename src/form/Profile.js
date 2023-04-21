import React from 'react'
import '../styles/form.scss'
import { useState } from 'react'
const Register = () => {

const handleSubmit =(e)=>{
    e.preventDefault();
    console.log('hello')
    // console.log(e);
    const data = new FormData(e.currentTarget);

    const user = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        contact: data.get('contact'), 
        address: data.get('address'),
        nitapian : collegeStudent ,
        rollno: data.get('rollNo'),
        course: data.get('course'),
        graduationYear: data.get('Graduationyear'),
        college: data.get('collegeName')

    }
    if(user)
    {
        console.log(user)
    }
    
}

    const [collegeStudent,setCollegeStudent] =  useState(true);
  return (
    <>
        <div className="MainFormComponent container">

            <div className='formHeading'>Add Profile Details</div>
            <form className='FormComponent' autoComplete="off"  onSubmit={handleSubmit}>
                {/* basic information  */}

            <div className='formColumn'>
                <div className='sectionHeading'> Basic Informations</div>
                <div className='FormLabel DoubleInputBox'> 
                    <div>
                    <label htmlFor="firstName">First Name* </label> 
                    <br/>
                    <input required className='halfInput' type="text" id="firstName" name="firstName" />
                    </div>
                    <div>
                    <label htmlFor="lastName">Last Name*</label>
                    <br/>
                    <input required className='halfInput' type="text" name="lastName" id="lastName"></input>
                    </div>
                </div>

                <div className='FormLabel DoubleInputBox'>
                    <div>
                        <label  htmlFor="email">Email*</label>
                        <input required className='halfInput' name="email" id="email" type="email" ></input>
                    </div>

                    <div className='Contact'>
                        <label htmlFor="contact">Mobile Number*</label>
                        <input  pattern="[6-9]{1}[0-9]{9}"   required className='halfInput' name="contact" type="tel" id="contact"></input>
                    </div>

                </div>

                <div className='FormLabel'>
                    <label htmlFor="address">Address*</label>
                    <input required className='halfInput' name="address" type="text" id="address"></input>
                </div>            
            </div>


            {/* addtional information */}

            <div className='formColumn'>
                <div className='sectionHeading'>Additional Information</div>

                <div className='FormLabel'>
                    <label  htmlFor="nitapian">Are You Student of NIT Arunachal Pradesh ?</label>
                    
                    <div className="option-group">
                    <div className="option-container" >

                        <input className="option-input" onChange={event => setCollegeStudent(true)} defaultChecked id="option-1" type="radio" name="options" />
                        <input className="option-input" onChange={event => setCollegeStudent(false)} id="option-2" type="radio" name="options" />
                        
                        <label className="option" htmlFor="option-1">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                        <sub>Yes</sub>

                        </span>
                        </label>

                        <label className="option" htmlFor="option-2">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                            <sub>No</sub>
                        </span>
                        </label>

                    </div>
                </div>
                   
            </div>


                {collegeStudent ==true ? <> <div className='FormLabel'>
                        <label htmlFor="rollNo">Enter Your RollNo*</label>
                        <input  required className='halfInput' name="rollNo" type="text" id="rollNo"></input>
                    </div>  </> : <>         <div className='FormLabel'>
                    <label htmlFor="collegeName">College Name*</label>
                    <input required className='halfInput' name="colleName"  type="text" id="colleName"></input>
                    
                </div>

                <div className='FormLabel DoubleInputBox' >

                    <div className='course'>
                        <label htmlFor="Course">Course Details:</label> 
                        <br/>
                        <select required className='halfInput'   style={{padding:"4px 12px"}}  name="course"   id="course">
                        <option value="BTech">Bechlors of Technology (B Tech)</option>
                        <option value="BSc">Bechlors of Science (BSc)</option> 
                        <option value="BA">Bechlors of Arts (BA)</option> 
                        <option value="Bcom">Bechlors of Commerce (BCom)e</option>
                        <option value ="MTech">Masters of Technology (M Tech)</option>
                        <option value ="MSc">Masters of Science (M Sc)</option>
                        <option value ="MA"> Masters of Arts (MA)</option>
                        <option value ="LLB"> Bachelor of Laws (L.L,B)</option>
                        <option value ="PhD">Doctorate of Philosophy (PhD)</option>
                        </select>
                        
                    </div>

                    <div className='year'>
                        <label htmlFor="year">Graduation Year:</label> 
                        <br/>
                        <select required className='halfInput'   style={{padding:"4px 12px"}} id="Graduationyear"  name="Graduationyear">
                        <option value="Forth Year">2023</option>
                        <option value ="Third Year">2024</option>
                        <option value ="Second Year">2025</option>
                        <option value ="First Year">2026</option>
                        </select>
                    </div>

                </div> </>}
 
            </div>
            <button className='submitButton' id="submit">Register</button>

            </form>
        </div>
    </>
  )
}

export default Register