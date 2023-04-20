import React from 'react'

import "../styles/form.scss"

const EventRegistration = () => {
  return (

    <>
    {/* fetched from the user details  */}

    {/* pop up and allow the user to edit name and details  */}

    <div className='MainFormComponent'>
        <div className='formHeading'>Event Registration Form</div>

        <form className='FormComponent'>
            <div className='formColumn'>


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

                {/* on the basis of loacl or outsider we decide this validations */}

                {/* if nitap college student  */}
              

             
                <div className='FormLabel'>
                    <label for="collegeName">College Name*</label>
                    <input className='halfInput'  type="text" id="colleName"></input>
                    
                </div>

                
                <div className='FormLabel DoubleInputBox'> 
                    <div>
                    <label for="teamName">Team Name* </label> 
                    <br/>
                    <input className='halfInput' type="text" id="firstName" name="name" />
                    </div>
                    <div>
                    <label for="teamLeaderName">Team Leaders Name*</label>
                    <br/>
                    <input className='halfInput' type="text" id="lastName"></input>
                    </div>
                </div>

                   
                <div className='FormLabel'>
                    
                    <label for="collegeName">Team Members Details</label>
                    <input className='halfInput'  type="text" id="colleName"></input>
                </div>

                {/* autofill the event name in which it is participating  */}

                <div className='eventName'>
                    <label for="eventName">Participating in Event</label> <br/> 
                    <input type="text" id="eventName"></input>
                </div>

                

                <div class="g-recaptcha"
                data-sitekey="6Lel4Z4UAAAAAOa8LO1Q9mqKRUiMYl_00o5mXJrR"></div>

            </div>
            <button className='submitButton' id="submit">Register</button>
                
        </form>
    </div>
    
    </>
    
  )
}

export default EventRegistration