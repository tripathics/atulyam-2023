import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion';
import Alert from '../components/Alert';
import SupportLink from '../components/SupportLink';
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg';

import styles from '../styles/Form.module.scss';
import cx from 'classnames';

import { eventSlots, events } from '../data/data';
import { db } from '../config/config-dev'
// import { db } from '../config/config-prod'
import { getDoc, doc, addDoc, collection, deleteDoc, where } from 'firebase/firestore'
import { useFetchCollection } from '../hooks/hooks';

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
  const {
    docs: eventsRegistered,
    fetching,
  } = useFetchCollection('registered', [where('userId', '==', user.user.uid)])

  const history = useNavigate();

  const [loading, setLoading] = useState(false);

  const [slotsUnavailable, setSlotsUnavailable] = useState([]);
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [overwriteDoc, setOverwriteDoc] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [course, setCourse] = useState('');

  const [selectedEvent, setSelectedEvent] = useState('');
  const [teamMemberDetails, setTeamMemberDetails] = useState('');
  const [teamName, setTeamName] = useState('');
  const [participatingInTeam, setParticipatingInTeam] = useState(true);
  const [readRules, setReadRules] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    setErrorMsg('');
    setLoading(true);
    getDoc(doc(db, 'users', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        const fetched = snap.data();
        setFirstName(fetched.firstName ? fetched.firstName : '');
        setLastName(fetched.lastName ? fetched.lastName : '');
        setEmail(user.user.email);
        setContact(fetched.contact ? fetched.contact : '');
        setCollegeName(fetched.college ? fetched.college : '');
        setRollNo(fetched.rollno ? fetched.rollno : '');
        setCourse(fetched.course ? fetched.course : '');
        setGradYear(fetched.graduationYear ? fetched.graduationYear : '')
        setAge(fetched.age ? fetched.age : '')
        setSex(fetched.gender ? fetched.gender : '')
        setAddress(fetched.address ? fetched.address : '');
      } else {
        setErrorMsg('Incomplete Profile! Update it from the Profile page before registering');
        console.log('Data does not exist');
      }
    }).catch(err => {
      console.log('An error occured', err)
    }).finally(() => {
      setLoading(false);
    })
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent || selectedEvent === '') return;
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const userFormData = {
      created: new Date().getTime(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      address: address,
      rollno: rollNo,
      graduationYear: gradYear,
      course: course,
      eventParticipation: selectedEvent,
      age: age,
      gender: sex,
      TeamName: data.get('teamName'),
      TeamSize: ((participatingInTeam === true) ? 'Group' : 'Individual'),
      TeamMembers: data.get('teamMemberDetails'),
      college: collegeName,
      userId: user.user.uid,
    }

    try {
      if (overwriteDoc) await deleteDoc(doc(db, 'registered', overwriteDoc))
      await addDoc(collection(db, 'registered'), userFormData);
      setSuccessMsg('Congratulations you have been successfully registered for the event!');
      history('/user');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleEventSelect = (id, slotId) => {
    setAlertMsg('');
    setOverwriteDoc(null);
    if (slotsUnavailable.includes(slotId)) {
      let registeredEvent = Object.keys(eventsRegistered).map(id => eventsRegistered[id])
        .find(evnt => events[evnt.eventParticipation].slotId === slotId)

      if (!registeredEvent) return;
      setOverwriteDoc(registeredEvent.id);
      if (registeredEvent.eventParticipation === id) {
        setAlertMsg(`Selecting this event will overwrite your previous application for ${events[id].title}`);
      } else {
        setAlertMsg(`Participating in ${events[id].title} will remove you from ${events[registeredEvent.eventParticipation].title}`);
      }
    }
    setSelectedEvent(id);
  }

  useEffect(() => {
    if (!user.isProfileComplete) {
      history('/update-profile');
    }
  }, [])

  useEffect(() => {
    if (!fetching) {
      let registereEventdIds = Object.keys(eventsRegistered).map(id => eventsRegistered[id].eventParticipation)
      let slotsFilled = registereEventdIds.map(id => events[id].slotId)
      setSlotsUnavailable(slotsFilled);
    }
  }, [fetching])

  return (
    <motion.div className={cx(styles['form-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <Alert severity='warning' message={alertMsg} handleDismiss={(e) => { e.preventDefault(); setAlertMsg('') }} />
      <div className='container'>
        <header className={cx('page-header', 'form-header')}>
          <h2 className='heading'>Register for events</h2>
        </header>

        <div className={styles['form-box']}>
          <Alert message={errorMsg} severity='error' handleDismiss={e => { e.preventDefault(); setErrorMsg('') }} />
          <Alert message={successMsg} severity='success' handleDismiss={e => { e.preventDefault(); setSuccessMsg('') }} />
          <form className={styles['login-form']} onSubmit={handleSubmit} autoComplete='off'>


            <div className={styles['form-section-btn-wrapper']} >
              <button className='btn secondary' type='button' onClick={(e) => {
                e.preventDefault();
                setEditPersonalDetails(!editPersonalDetails);
              }}>
                {!editPersonalDetails ? <span className='btn-subtitle'>Personal information from profile</span>
                  : <span className='btn-subtitle'>Close</span>}
                <span className='btn-text'></span>
              </button>
            </div>
            <div className={cx(styles['form-section'], {
              [styles.active]: editPersonalDetails
            })}>
              <h5 style={{ marginBottom: '0.8rem' }}>You can edit by going to the Profile section in the menu</h5>
              <div className={styles['form-fields']}>
                <TextInputField name={'firstName'} placeholder={'First name *'} val={firstName} attrs={{ disabled: true }} />
                <TextInputField name={'lastName'} placeholder={'Last name *'} val={lastName} attrs={{ disabled: true }} />
              </div>
              <div className={styles['form-fields']}>
                <TextInputField type='email' name={'email'} placeholder={'Email *'} val={email} attrs={{ disabled: true }} />
                <TextInputField type='tel' pattern="[6-9]{1}[0-9]{9}" title='Enter a 10 digit number' name={'contact'} placeholder={'Whatsapp number *'} val={contact} setVal={setContact} />
              </div>
              <div className={styles['form-fields']}>
                <div className={cx(styles['form-field'])}>
                  <label htmlFor='gender'>Sex *</label>
                  <select required name="gender" id="gender" disabled value={sex} defaultChecked="">
                    <option value="">Select sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-Binary</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                  </select>
                </div>
                <TextInputField type='number' name={'age'} attrs={{ min: 15, max: 100, disabled: true }} placeholder={'Age *'} val={age} />
              </div>
              <TextInputField name={'collegeName'} placeholder={'College Name *'} val={collegeName} attrs={{ disabled: true }} />
              <div className={cx(styles['form-field'])}>
                <label htmlFor='address'>Address *</label>
                <textarea value={address} disabled placeholder='Enter your address' title='Address' required name='address' id='address' />
              </div>
            </div>

            {fetching ? <p>Please wait...</p> : (
              <div className={cx(styles['form-fields'], styles['slots-wrapper'])}>
                <div className={styles['form-field']}>
                  <label htmlFor='events'>Select an event to participate *</label>
                  <ul className={styles['event-slots']}>
                    {Object.keys(eventSlots).sort().map((slotId, i) => <li key={slotId} className={styles.slot}>
                      <div className={styles['slot-label']}>Time slot {i + 1}</div>
                      <div className={styles['radio-group']} key={slotId}>
                        {eventSlots[slotId].map(id => (
                          <div key={id} className={styles['radio-option']}>
                            <input className={styles.radio} required
                              type="radio" name={'events'} value={id}
                              disabled={!events[id].isRegistrationOpen}
                              title={!events[id].isRegistrationOpen ? 'Registration closed' : ''}
                              onChange={e => { handleEventSelect(e.target.value, slotId) }}
                            />
                            <label className={styles['radio-label']} htmlFor={'events'}>{events[id].title}</label>
                          </div>
                        ))}
                      </div>
                    </li>)}
                  </ul>
                </div>
                {selectedEvent && events[selectedEvent].rules && (<div className={styles['form-link']}>
                  <a className={cx('btn', 'secondary', styles['form-btn'])} target='_blank' rel='noreferrer' href={events[selectedEvent].rules}>
                    <span className={cx('btn-text', styles['btn-text'])}>View rules</span>
                    <LinkIcon />
                  </a>
                </div>)}
              </div>
            )}

            {selectedEvent && (<>
              {events[selectedEvent].solo === false && <div className={styles['form-fields']}>
                <TextInputField name={'teamName'} placeholder={'Team name *'} val={teamName} setVal={setTeamName} />
                <TextInputField name={'teamMemberDetails'} placeholder={'Other Team members\' names *'} val={teamMemberDetails} setVal={setTeamMemberDetails} />
              </div>}

              {events[selectedEvent].solo === undefined && (<>
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
                    <TextInputField name={'teamMemberDetails'} placeholder={'Other Team members\' names *'} val={teamMemberDetails} setVal={setTeamMemberDetails} />
                  </div>}
              </>)}
            </>)}

            <div className={styles['form-field']}>
              <div className={styles['checkbox-input-wrapper']}>
                <input required type='checkbox' className={styles.checkbox} checked={readRules} onChange={(e) => { setReadRules(!readRules) }} name='Rules' />
                <label className={styles['checkbox-label']} htmlFor='Rules'>I have read and followed the event rules and guidelines (Applications not complying with the rules will be rejected)</label>
              </div>
            </div>

            <div className={styles['btns-wrapper']}>
              <button disabled={loading || !selectedEvent} className={'btn'} type="submit">
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