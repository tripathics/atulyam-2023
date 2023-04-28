import React from 'react'
import "../styles/form.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../config/config'
import Alert from '../components/Alert';
import SupportLink from '../components/SupportLink';
import { motion } from 'framer-motion';
import styles from '../styles/Form.module.scss';
import cx from 'classnames';
import { events } from '../data/data';
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg';

const TextInputField = ({ val = '', title = '', pattern = '.*', setVal, name, placeholder, type = 'text', attrs = {} }) => (
  <div className={styles['form-field']}>
    <label htmlFor={name} data-name={placeholder} className={cx(
      { [styles.filled]: val }
    )}>
      <input pattern={pattern} title={title} type={type} required name={name} id={name} value={val} {...attrs} onChange={(e) => { setVal(e.target.value) }} />
    </label>
  </div>
)

const Register = ({ user }) => {
  const history = useNavigate();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [age, setAge] = useState('');
  const [teamMemberDetails, setTeamMemberDetails] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [participatingInTeam, setParticipatingInTeam] = useState(true);
  const [readRules, setReadRules] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [id, setUid] = useState('')

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    setLoading(true);
    getDoc(doc(db, 'users', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        const fetched = snap.data();
        setUid(user.user.uid);
        setFirstName(fetched.firstName ? fetched.firstName : '');
        setLastName(fetched.lastName ? fetched.lastName : '');
        setEmail(fetched.email ? fetched.email : '');
        setContact(fetched.contact ? fetched.contact : '')
        setCollegeName(fetched.college ? fetched.college : '')
        setAge(fetched.age ? fetched.age : '')
        if (fetched.TeamSize !== 'Individual') setParticipatingInTeam(false);

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
      TeamSize: ((participatingInTeam === true) ? 'Group' : 'Individual'),
      TeamMembers: data.get('teamMembers'),
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
      history('/update-profile');
    }
  }, [])

  return (
    <motion.div className={cx(styles['form-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
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
              <TextInputField name={'lastName'} placeholder={'Last name *'} val={lastName} setVal={setLastName} />
            </div>
            <div className={styles['form-fields']}>
              <TextInputField type='email' name={'email'} placeholder={'Email *'} val={email} attrs={{ disabled: true }} />
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
            <TextInputField name={'collegeName'} placeholder={'College Name *'} val={collegeName} attrs={{ disabled: true }} />
            <div className={cx(styles['form-field'])}>
              <label htmlFor='address'>Address *</label>
              <textarea placeholder='Enter your address' title='Address' required name='address' id='address' />
            </div>

            <div className={styles['form-fields']}>
              <div className={styles['form-field']}>
                <label htmlFor='events'>Select an event to participate *</label>
                <select required name="events" id="events" defaultValue={""} defaultChecked onChange={(e) => { setSelectedEvent(e.target.value) }}>
                  <option disabled="disabled" value="">Select an event to participate</option>
                  {Object.keys(events).filter(id => events[id].isRegistrationOpen).map(id => (
                    <option key={id} value={id}>{events[id].title}</option>
                  ))}
                </select>
              </div>
              {selectedEvent && events[selectedEvent].rules && (<div className={styles['form-link']}>
                <a className={cx('btn', 'secondary', styles['form-btn'])} target='_blank' rel='noreferrer' href={events[selectedEvent].rules}>
                  <span className={cx('btn-text', styles['btn-text'])}>View rules</span>
                  <LinkIcon />
                </a>
              </div>)}
            </div>
            {selectedEvent && !events[selectedEvent].solo && (<>
              <div className={cx(styles['form-field'])}>
                <label htmlFor='Individual'>Are you participating in a team? *</label>
                <div className={styles['radio-group']}>
                  <div className={styles['radio-option']}>
                    <input className={styles.radio}
                      checked={participatingInTeam === true}
                      onChange={event => setParticipatingInTeam(true)}
                      id="option-2" type="radio" name="options"
                    />
                    <label className={styles['radio-label']} htmlFor='Yes'>Yes</label>
                  </div>
                  <div className={styles['radio-option']}>
                    <input className={styles.radio}
                      checked={participatingInTeam === false}
                      onChange={event => setParticipatingInTeam(false)}
                      id="option-1" type="radio" name="options"
                    />
                    <label className={styles['radio-label']} htmlFor='No'>No</label>
                  </div>
                </div>
              </div>
              {participatingInTeam &&
                <div className={styles['form-fields']}>
                  <TextInputField name={'teamName'} placeholder={'Team name *'} val={teamName} setVal={setTeamName} />
                  <TextInputField name={'teamMemberDetails'} placeholder={'Team members *'} val={teamMemberDetails} setVal={setTeamMemberDetails} />
                </div>}
            </>)}

            {selectedEvent && events[selectedEvent].rules && <div className={styles['form-field']}>
              <div className={styles['checkbox-input-wrapper']}>
                <input required type='checkbox' className={styles.checkbox} checked={readRules} onChange={(e) => { setReadRules(!readRules) }} name='Rules' />
                <label className={styles['checkbox-label']} htmlFor='Rules'>I have followed the event rules carefully to fill this form</label>
              </div>
            </div>}

            <div className={styles['btns-wrapper']}>
              <button disabled={loading} className={'btn'} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Register</span>
                {loading && <SpinnerIcon />}
              </button>
            </div>
          </form>
          <SupportLink />
        </div>
      </div>
    </motion.div>
  )
}

export default Register;