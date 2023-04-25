import React, { useEffect } from 'react'
import '../styles/form.scss'
import { useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from "../config/config"
import Alert from '../components/Alert'
const Register = ({ user }) => {
  const [collegeStudent, setCollegeStudent] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  console.log(user);
  const updateProfile = (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime()

    const data = new FormData(e.currentTarget);
    const userProfile = {
      created: new Date(currentTime).toLocaleString('en-IN', { dateStyle: "medium", timeStyle: "short", }),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      contact: data.get('contact'),
      address: data.get('address'),
      nitapian: collegeStudent,
      rollno: data.get('rollno'),
      gender: data.get('gender'),
      age: data.get('age'),
      course: data.get('course'),
      graduationYear: data.get('graduationYear'),
      college: (collegeStudent ? "NITAP" : data.get('collegeName'))
    }
    setDoc(doc(db, 'users', user.user.uid), {
      ...userProfile, isProfileComplete: true
    }, { merge: true })
  }

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    function updateFormData(id,val) {
        document.getElementById(id).value = val ? val : '';
    }

    getDoc(doc(db, 'users', user.user.uid)).then(snap => {
      if (!snap.exists()) return; 
      const data = snap.data();
      updateFormData('firstName',data.firstName);
      updateFormData('lastName',data.lastName);
      updateFormData('email',data.email);
      updateFormData('contact',data.contact);
      updateFormData('collegeName',data.college);
      updateFormData('address',data.address);
      updateFormData('age',data.age);
      updateFormData('gender',data.gender);
      updateFormData('rollno',data.rollno);
    })
  }, [user])

  return (
    <>
      <div className="MainFormComponent container">

        <div className='formHeading'>Add Profile Details</div>
        <form className='FormComponent' autoComplete="off" onSubmit={updateProfile}>
          <Alert severity='error' message={errorMsg} handleDismiss={e => {e.preventDefault(); setErrorMsg('')}} />
          <Alert severity='success' message={successMsg} handleDismiss={e => {e.preventDefault(); setSuccessMsg('')}} />
          <div className='formColumn'>
            <div className='sectionHeading'> Basic Informations</div>
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
                <input disabled required className='halfInput' name="email" id="email" type="email" ></input>
              </div>

              <div className='Contact'>
                <label htmlFor="contact">Mobile Number*</label>
                <input pattern="[6-9]{1}[0-9]{9}" required className='halfInput' name="contact" type="tel" id="contact"></input>
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
              <label htmlFor="address">Address*</label>
              <input required className='halfInput' name="address" type="text" id="address"></input>
            </div>
          </div>



          {/* addtional information */}

          <div className='formColumn'>
            <div className='sectionHeading'>Additional Information</div>

            <div className='FormLabel'>
              <label htmlFor="nitapian">Are You Student of NIT Arunachal Pradesh ?</label>

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


            {collegeStudent === true ? <> <div className='FormLabel'>
              <label htmlFor="rollno">Enter Your RollNo*</label>
              <input required className='halfInput' name="rollno" type="text" id="rollno"></input>
            </div>  </> : <>         <div className='FormLabel'>
              <label htmlFor="collegeName">College Name*</label>
              <input required className='halfInput' name="colleName" type="text" id="colleName"></input>

            </div>

              <div className='FormLabel DoubleInputBox' >

                <div className='course'>
                  <label htmlFor="Course">Course Details:</label>
                  <br />
                  <select required className='halfInput' style={{ padding: "4px 12px" }} name="course" id="course">
                    <option value="BTech">Bechlors of Technology (B Tech)</option>
                    <option value="BSc">Bechlors of Science (BSc)</option>
                    <option value="BA">Bechlors of Arts (BA)</option>
                    <option value="Bcom">Bechlors of Commerce (BCom)e</option>
                    <option value="MTech">Masters of Technology (M Tech)</option>
                    <option value="MSc">Masters of Science (M Sc)</option>
                    <option value="MA"> Masters of Arts (MA)</option>
                    <option value="LLB"> Bachelor of Laws (L.L,B)</option>
                    <option value="PhD">Doctorate of Philosophy (PhD)</option>
                  </select>

                </div>

                <div className='year'>
                  <label htmlFor="graduationYear">Graduation Year:</label>
                  <br />
                  <select required className='halfInput' style={{ padding: "4px 12px" }} id="graduationYear" name="graduationYear">
                    <option value="Forth Year">2023</option>
                    <option value="Third Year">2024</option>
                    <option value="Second Year">2025</option>
                    <option value="First Year">2026</option>
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