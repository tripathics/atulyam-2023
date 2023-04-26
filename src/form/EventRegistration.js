import React from 'react'
import "../styles/form.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../config/config'
import Alert from '../components/Alert';

const EventRegistration = ({ user }) => {
  const history = useNavigate();

  const [individualParticipation, setIndividualParticipation] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [id, setUid] = useState('')

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    getDoc(doc(db, 'users', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        // console.log(snap.data());
        const fetched = snap.data();
        setUid(user.user.uid);
        updateFormData('firstName', fetched.firstName);
        updateFormData('lastName', fetched.lastName);
        updateFormData('email', fetched.email);
        updateFormData('contact', fetched.contact);
        updateFormData('collegeName', fetched.college);
        updateFormData('address', fetched.address);
        updateFormData('age', fetched.age);
        updateFormData('gender', fetched.gender);
      } else {
        console.log('Data does not exist');
      }
    }).catch(err => {
      console.log('An error occured', err)
    })
  }, [user])


  function updateFormData(ref, val) {
    document.getElementById(ref).value = val ? val : '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userFormData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: user.user.email,
      contact: data.get('contact'),
      address: data.get('address'),
      rollno: data.get('rollNo'),
      eventParticipation: data.get('events'),
      age: data.get('age'),
      gender: data.get('gender'),
      TeamName: data.get('teamName'),
      TeamSize: ((individualParticipation === true) ? 'Individual' : 'Group'),
      TeamMebers: data.get('teamMembers'),
      college: data.get('collegeName'),
      userId: user.user.uid,
      isRegister: true,
    }

    setDoc(doc(db, 'registered', id), userFormData)
      .then(() => {
        setSuccessMsg('Congratulations you have been successfully registered for the event!');
        history('/user');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      })
  }

  useEffect(() => {
    if (!user.isProfileComplete) {
      history('/profile');
    }
  }, [])

  return (
    <div className='MainFormComponent container'>
      <div className='formHeading'>Event Registration Form</div>

      <form className='FormComponent' autoComplete="off" autoFocus="none" onSubmit={handleSubmit}>
        <div className='formColumn'>

          <Alert message={errorMsg} severity='error' handleDismiss={e => { e.preventDefault(); setErrorMsg('') }} />
          <Alert message={successMsg} severity='success' handleDismiss={e => { e.preventDefault(); setSuccessMsg('') }} />

          <div className='FormLabel DoubleInputBox'>
            <div>
              <label htmlFor="firstName">First Name* </label>
              <br />
              <input required className='halfInput' type="text" id="firstName" name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name*</label>
              <br />
              <input required className='halfInput' type="text" name="lastName" id="lastName"></input>
            </div>
          </div>

          <div className='FormLabel DoubleInputBox'>
            <div>
              <label htmlFor="email">Email*</label>
              <input disabled required className='halfInput' type="email" name="email" id="email" ></input>
            </div>

            <div className='Contact'>
              <label htmlFor="contact">Mobile Number*</label>
              <input pattern="[6-9]{1}[0-9]{9}" required className='halfInput' type="tel" name="contact" id="contact"></input>
            </div>

          </div>

          <div className='FormLabel DoubleInputBox' >
            <div className='age'>
              <label htmlFor="Course">Gender</label>
              <br />
              <select required className='halfInput' style={{ padding: "4px 12px" }} name="gender" id="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-Binary</option>
                <option value="I prefer not to answer">I Prefer not to answer</option>

              </select>
            </div>

            <div className='FormLabel'>
              <div className='year'>
                <label htmlFor="age">Age</label>
                <br />
                <select required className='halfInput' style={{ padding: "4px 12px" }} name="age" id="age">
                  <option value="16">16 Yrs</option>
                  <option value="17">17 Yrs</option>
                  <option value="18">18 Yrs</option>
                  <option value="19">19 Yrs</option>
                  <option value="20">20 Yrs</option>
                  <option value="21">21 Yrs</option>
                  <option value="22">22 Yrs</option>
                  <option value="23">23 Yrs</option>
                  <option value="24">24 Yrs</option>
                  <option value="25">25 Yrs</option>
                  <option value="26">26 Yrs</option>
                  <option value="I prefer not to answer">I Prefer not to answer</option>

                </select>
              </div>
            </div>
          </div>


          <div className='FormLabel'>
            <label htmlFor="collegeName">College Name*</label>
            <input required className='halfInput' type="text" name="collegeName" id="collegeName"></input>

          </div>

          <div className='FormLabel'>
            <label htmlFor="address">Address*</label>
            <input required className='halfInput' name="address" type="text" id="address"></input>
          </div>

          <div className='FormLabel'>
            <div className='event'>
              <label htmlFor="events">Participating in Event</label>
              <br />
              <select required className='halfInput' style={{ padding: "4px 12px" }} name="events" id="events">
                <option value="Modern Dance">Modern Dance</option>
                <option value="Quize">Quize </option>
                <option value="Poetry Slam">Poetry Slam</option>
                <option value="Painting">Painting</option>
                <option value="Short Film Making">Short Film Making</option>
                <option value="Essay">Essay</option>
                <option value="Solo Song"> Solo Song</option>
              </select>

            </div>

          </div>




          <div className='FormLabel'>

            <label htmlFor="Individual">Team Size*</label>

            <div className="option-group">
              <div className="option-container" >

                <input className="option-input" onChange={event => setIndividualParticipation(true)} defaultChecked id="option-1" type="radio" name="options" />
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



          {individualParticipation === false && <>


            <div className='FormLabel DoubleInputBox'>
              <div>
                <label htmlFor="teamName">Team Name* </label>
                <br />
                <input required className='halfInput' type="text" name="teamName" id="teamName" />
              </div>
              <div>
                <label htmlFor="teamLeaderName">Team Leaders Name*</label>
                <br />
                <input required className='halfInput' type="text" name="teamLeader" id="teamLeader"></input>
              </div>
            </div>

            <div className='FormLabel'>
              <label htmlFor="collegeName">Team Members Details*</label>
              <input required className='halfInput' type="text" name="teamMembers" id="teamMembers"></input>
            </div>
          </>}

        </div>
        <button className='submitButton' id="submit">Register</button>

      </form>
    </div>
  )
}

export default EventRegistration