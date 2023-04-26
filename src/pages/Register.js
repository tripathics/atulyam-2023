import React from 'react'
import "../styles/form.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../config/config'
import Alert from '../components/Alert';
import styles from '../styles/Register.module.scss';
import cx from 'classnames';
import { events1 } from '../data/data';
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'

const TextInputField = ({ val = '', title = '', pattern = '.*', setVal, name, placeholder, type = 'text', attrs = {} }) => (
  <div className={styles['form-field']}>
    <label htmlFor={name} data-name={placeholder} className={cx(
      { [styles.filled]: val.length }
    )}>
      <input pattern={pattern} title={title} type={type} required name={name} id={name} value={val} {...attrs} onChange={(e) => { setVal(e.target.value) }} />
    </label>
  </div>
)

const Register = ({ user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [age, setAge] = useState('');
  const [teamMemberDetails, setTeamMemberDetails] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const [individualParticipation, setIndividualParticipation] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [id, setUid] = useState('')

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    setLoading(true);
    getDoc(doc(db, 'users', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        // console.log(snap.data());
        const fetched = snap.data();
        setUid(user.user.uid);
        setFirstName(fetched.firstName);
        setLastName(fetched.lastName);
        setEmail(fetched.email);
        setContact(fetched.contact)
        setCollegeName(fetched.college)
        setAge(fetched.age)
        updateFormData('gender', fetched.gender);
        updateFormData('address', fetched.address);
        updateFormData('gender', fetched.gender);
      } else {
        console.log('Data does not exist');
      }
    }).catch(err => {
      console.log('An error occured', err)
    }).finally(() => {
      setLoading(false);
    })
  }, [user])


  function updateFormData(ref, val) {
    document.getElementById(ref).value = val ? val : '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!user.isProfileComplete) {
      history('/profile');
    }
  }, [])

  return (
    <div className={styles.register}>
      <div className='container'>
        <header className={cx('page-header', 'form-header')}>
          <h2 className='heading'>Register for events</h2>
        </header>

        <div className={styles['form-box']}>
          <Alert message={errorMsg} severity='error' handleDismiss={e => { e.preventDefault(); setErrorMsg('') }} />
          <Alert message={successMsg} severity='success' handleDismiss={e => { e.preventDefault(); setSuccessMsg('') }} />
          <form className={styles['login-form']} onSubmit={handleSubmit} autoComplete='off'>
            <div className={styles['form-fields']}>
              <TextInputField name={'firstName'} placeholder={'First name *'} val={firstName} setVal={setFirstName} />
              <TextInputField name={'firstName'} placeholder={'Last name *'} val={lastName} setVal={setLastName} />
            </div>
            <div className={styles['form-fields']}>
              <TextInputField type='email' name={'email'} placeholder={'Email *'} val={email} setVal={setEmail} />
              <TextInputField type='tel' pattern="[6-9]{1}[0-9]{9}" title='Enter a 10 digit number' name={'contact'} placeholder={'Whatsapp number *'} val={contact} setVal={setContact} />
            </div>
            <div className={styles['form-fields']}>
              <div className={cx(styles['form-field'])}>
                <label htmlFor='gender'>Sex *</label>
                <select required name="gender" id="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-Binary</option>
                  <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
              </div>
              <TextInputField type='number' name={'age'} attrs={{ min: 15, max: 100 }} placeholder={'Age *'} val={age} setVal={setAge} />
            </div>
            <TextInputField name={'collegeName'} placeholder={'College Name *'} val={collegeName} setVal={setCollegeName} />
            <div className={cx(styles['form-field'])}>
              <label htmlFor='address'>Address *</label>
              <textarea placeholder='Enter your address' title='Address' required name='address' id='address' />
            </div>
            <div className={cx(styles['form-field'])}>
              <label htmlFor='events'>Event</label>
              <select required name="events" id="events" defaultChecked>
                <option disabled="disabled" selected="true" value="">Select an event to participate</option>
                {events1.filter(event => event.isRegistrationOpen).map(event => (
                  <option value={event.id}>{event.title}</option>
                ))}
              </select>
            </div>

            <div className={cx(styles['form-field'])}>
              <label htmlFor='Individual'>Are you participating in a team? *</label>
              <div className={styles['radio-group']}>
                <div className={styles['radio-option']}>
                  <input className={styles.radio} onChange={event => setIndividualParticipation(true)} defaultChecked id="option-1" type="radio" name="options" />
                  <label className={styles['radio-label']} htmlFor='No'>No</label>
                </div>
                <div className={styles['radio-option']}>
                  <input className={styles.radio} onChange={event => setIndividualParticipation(false)} id="option-2" type="radio" name="options" />
                  <label className={styles['radio-label']} htmlFor='Yes'>Yes</label>
                </div>
              </div>
            </div>

            {!individualParticipation &&
              <div className={styles['form-fields']}>
                <TextInputField name={'teamName'} placeholder={'Team name *'} val={teamName} setVal={setTeamName} />
                <TextInputField name={'teamMemberDetails'} placeholder={'Team member details *'} val={teamMemberDetails} setVal={setTeamMemberDetails} />
              </div>}

            <div className={styles['btns-wrapper']}>
              <button disabled={loading} className={'btn'} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Register</span>
                {loading && <SpinnerIcon />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;