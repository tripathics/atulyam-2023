import React from 'react'
import "../styles/form.scss"
import { useState } from 'react';

const EventRegistration = () => {
    const [individualParticipation,setIndividualParticipation] =  useState(true);

    

    const handleSubmit =(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            contact: data.get('contact'), 
            address: data.get('address'),
            rollno: data.get('rollNo'),
            eventParticipation: data.get('events'),
            TeamName: data.get('teamName'),
            TeamSize: ((individualParticipation==true) ? 'Individual' : 'Group'),
            TeamMebers: data.get('teamMembers'),
            college: data.get('collegeName')
        }
        if(user)
        {
            console.log(user)
        }
    }


  return (

    <>
    <div className='MainFormComponent container'>
        <div className='formHeading'>Event Registration Form</div>

        <form className='FormComponent' autoComplete="off" autoFocus="none" onSubmit={handleSubmit}>
            <div className='formColumn'>


                <div className='FormLabel DoubleInputBox'> 
                    <div>
                    <label htmlFor="firstName">First Name* </label> 
                    <br/>
                    <input  required className='halfInput' type="text" id="firstName" name="firstName" />
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
                        <input required className='halfInput' type="email" name="email" id="email" ></input>
                    </div>

                    <div className='Contact'>
                        <label htmlFor="contact">Mobile Number*</label>
                        <input pattern="[6-9]{1}[0-9]{9}"   required className='halfInput' type="tel" name="contact" id="contact"></input>
                    </div>

                </div>
 
              
                <div className='FormLabel'>
                    <label htmlFor="collegeName">College Name*</label>
                    <input required className='halfInput'  type="text" name="colleName" id="colleName"></input>
                    
                </div>

                <div className='FormLabel'>
                    <label htmlFor="address">Address*</label>
                    <input required className='halfInput' name="address" type="text" id="address"></input>
                </div>  

                <div className='FormLabel'>
                    <div className='event'>
                            <label htmlFor="events">Participating in Event</label> 
                            <br/>
                            <select required className='halfInput'  style={{padding:"4px 12px"}}  name="events"  id="events">
                            <option value="Modern Dance">Modern Dance</option>
                            <option value="Quize">Quize </option> 
                            <option value ="Poetry Slam">Poetry Slam</option>
                            <option value="Painting">Painting</option> 
                            <option value="Short Film Making">Short Film Making</option>
                            <option value ="Essay">Essay</option>
                            <option value ="Solo Song"> Solo Song</option>
                            </select>
                            
                    </div>

                </div>
                
                
                <div className='FormLabel DoubleInputBox'> 
                    <div>
                    <label  htmlFor="teamName">Team Name* </label> 
                    <br/>
                    <input required className='halfInput' type="text" name="teamName" id="teamName" />
                    </div>
                    <div>
                    <label htmlFor="teamLeaderName">Team Leaders Name*</label>
                    <br/>
                    <input required className='halfInput' type="text" name="teamLeader" id="teamLeader"></input>
                    </div>
                </div> 

       
 
                <div className='FormLabel'> 

                <label  htmlFor="Individual">Team Size*</label>
                    
                <div className="option-group">
                    <div className="option-container" >
                        
                        <input  className="option-input" onChange={event => setIndividualParticipation(true)}  defaultChecked id="option-1" type="radio" name="options" />
                        <input className="option-input" onChange={event => setIndividualParticipation(false)} id="option-2" type="radio" name="options" />
                        
                        <label className="option" htmlFor="option-1">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                        <sub>Individual</sub>

                        </span>
                        </label>

                        <label className="option" htmlFor="option-2">
                        <span className="option__indicator"></span>
                        <span className="option__label">
                            <sub>Group</sub>
                        </span>
                        </label>
                    </div>
                </div>
                </div> 

             
            
                {individualParticipation ==false && <>
                <div className='FormLabel'>
                    <label htmlFor="collegeName">Team Members Details*</label>
                    <input required className='halfInput'  type="text" name="teamMembers" id="teamMembers"></input>
                </div>
                </>}

            </div>
            <button className='submitButton' id="submit">Register</button>
                
        </form>
    </div>
    
    </>
    
  )
}

export default EventRegistration