import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth'
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { motion } from 'framer-motion';

import { db } from "../config/config-dev"
// import { db } from "../config/config-prod"
import Alert from '../components/Alert'

import styles from '../styles/Form.module.scss';
import cx from 'classnames';

const TextInputField = ({ val = '', title = '', pattern = '.*', setVal, name, placeholder, type = 'text', attrs = {} }) => (
  <div className={styles['form-field']}>
    <label htmlFor={name} data-name={placeholder} className={cx(
      { [styles.filled]: val }
    )}>
      <input pattern={pattern} title={title} type={type} required name={name} id={name} value={val} {...attrs} onChange={(e) => { setVal(e.target.value) }} />
    </label>
  </div>
)

const UpdateProfile = ({ user, updateProfile }) => {
  const history = useNavigate();
  const [isCollegeStudent, setIsCollegeStudent] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [age, setAge] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [loading, setLoading] = useState(false);


  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const currentTime = new Date().getTime()

    const data = new FormData(e.currentTarget);
    const displayName = data.get('firstName');
    const userProfile = {
      created: new Date(currentTime).toLocaleString('en-IN', { dateStyle: "medium", timeStyle: "short", }),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      contact: data.get('contact'),
      address: data.get('address'),
      nitapian: isCollegeStudent,
      rollno: data.get('rollno'),
      gender: data.get('gender'),
      age: data.get('age'),
      course: data.get('course'),
      userid: user.user.uid,
      graduationYear: data.get('graduationYear'),
      college: (isCollegeStudent ? "NITAP" : data.get('collegeName'))
    }

    firebaseUpdateProfile(user.user, { displayName: displayName })
      .then(() => {
        return setDoc(doc(db, 'users', user.user.uid), {
          ...userProfile, isProfileComplete: true
        }, { merge: true })
      })
      .then(() => {
        setSuccessMsg('Profile updated successfully')
        if (!user.isProfileComplete) {
          updateProfile({ isProfileComplete: true });
          history('/register');
        } else {
          history('/user');
        }
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(err.message);
      })
  }

  useEffect(() => {
    if (!user.user) return;
    function updateFormData(id, val) {
      if (document.getElementById(id) === null) console.log(id)
      document.getElementById(id).value = val ? val : '';
    }
    getDoc(doc(db, 'users', user.user.uid)).then(snap => {
      if (!snap.exists()) return;
      const data = snap.data();
      setFirstName(data.firstName ? data.firstName : '');
      setLastName(data.lastName ? data.lastName : '');
      setEmail(data.email ? data.email : '');
      setContact(data.contact ? data.contact : '');
      setCollegeName(data.college ? data.college : '');
      setAge(data.age ? data.age : '');
      setRollNo(data.rollno ? data.rollno : '');
      setGradYear(data.graduationYear ? data.graduationYear : '');
      if (data.nitapian === false) setIsCollegeStudent(false);
      updateFormData('address', data.address);
      updateFormData('gender', data.gender);
    })
  }, [user])

  return (
    <motion.div className={cx(styles['form-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className='container'>
        <header className={cx('page-header', 'form-header')}>
          <h2 className='heading'>Update Profile</h2>
        </header>

        <div className={styles['form-box']}>
          <Alert message={errorMsg} severity='error' handleDismiss={e => { e.preventDefault(); setErrorMsg('') }} />
          <Alert message={successMsg} severity='success' handleDismiss={e => { e.preventDefault(); setSuccessMsg('') }} />
          <form className={styles['login-form']} onSubmit={handleProfileUpdate} autoComplete='off'>
            <div className={styles['form-fields']}>
              <TextInputField name={'firstName'} placeholder={'First name *'} val={firstName} setVal={setFirstName} />
              <TextInputField name={'lastName'} placeholder={'Last name *'} val={lastName} setVal={setLastName} />
            </div>
            <div className={styles['form-fields']}>
              <TextInputField type='email' name={'email'} placeholder={'Email *'} val={email} attrs={{ disabled: true }} />
              <TextInputField type='tel' pattern="[6-9]{1}[0-9]{9}" title='Enter a 10 digit number' name={'contact'} placeholder={'Whatsapp number *'} val={contact} setVal={setContact} />
            </div>
            <div className={styles['form-fields']}>
              <div className={cx(styles['form-field'])}>
                <label htmlFor='gender'>Sex *</label>
                <select required name="gender" id="gender" defaultChecked="">
                  <option value="" disabled>Select sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-Binary</option>
                  <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
              </div>
              <TextInputField type='number' name={'age'} attrs={{ min: 15, max: 100 }} placeholder={'Age *'} val={age} setVal={setAge} />
            </div>

            <div className={cx(styles['form-field'])}>
              <label htmlFor='Individual'>Are you a student of NITAP? *</label>
              <div className={styles['radio-group']}>
                <div className={styles['radio-option']}>
                  <input className={styles.radio} onChange={event => setIsCollegeStudent(true)} id="option-1" checked={isCollegeStudent === true} type="radio" name="options" />
                  <label className={styles['radio-label']} htmlFor='Yes'>Yes</label>
                </div>
                <div className={styles['radio-option']}>
                  <input className={styles.radio} onChange={event => setIsCollegeStudent(false)} id="option-2" checked={isCollegeStudent === false} type="radio" name="options" />
                  <label className={styles['radio-label']} htmlFor='No'>No</label>
                </div>
              </div>
            </div>

            {!isCollegeStudent ? <>
              <TextInputField name={'collegeName'} placeholder={'College name *'} val={collegeName} setVal={setCollegeName} />
              <div className={styles['form-fields']}>

                <div className={cx(styles['form-field'])}>
                  <label htmlFor='Course'>Course Details *</label>
                  <select required name="gender" id="gender">
                    <option value="BTech">Bachelors of Technology (B Tech)</option>
                    <option value="BSc">Bachelors of Science (BSc)</option>
                    <option value="BA">Bachelors of Arts (BA)</option>
                    <option value="Bcom">Bachelors of Commerce (BCom)e</option>
                    <option value="MTech">Masters of Technology (M Tech)</option>
                    <option value="MSc">Masters of Science (M Sc)</option>
                    <option value="MA"> Masters of Arts (MA)</option>
                    <option value="LLB"> Bachelor of Laws (L.L,B)</option>
                    <option value="PhD">Doctorate of Philosophy (PhD)</option>
                    <option value="bA">Bachelors of Arts (B.A.)</option>
                    <option value="MA">Masters of Arts (M.A.)</option>
                    <option value="MBBS">MBBS</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <TextInputField type='number' name={'graduationYear'} attrs={{ min: 2010, max: 2030 }} placeholder={'Graduation Year *'} val={gradYear} setVal={setGradYear} />
              </div></>
              : <TextInputField name={'rollno'} placeholder={'Roll no. *'} val={rollNo} setVal={setRollNo} />}

            <div className={cx(styles['form-field'])}>
              <label htmlFor='address'>Address *</label>
              <textarea placeholder='Enter your address' title='Address' required name='address' id='address' />
            </div>

            <div className={styles['btns-wrapper']}>
              <button disabled={loading} className={'btn'} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Update profile</span>
                {loading && <SpinnerIcon />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default UpdateProfile;