import React, { useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../config/config'
import { useEffect } from 'react'
import { ReactComponent as LogoutIcon } from '../media/icons/logout.svg'
import { ReactComponent as RegisterIcon } from '../media/icons/register.svg'
import { ReactComponent as UpdateIcon } from '../media/icons/update.svg'
import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';


import QrCode from '../components/qrCode'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Events.module.scss'
import styles1 from '../styles/Profile.module.scss'
import '../styles/user.scss'
import cx from 'classnames'
import Alert from '../components/Alert'
import { events1 } from '../data/data'


const UserProfile = ({ user, logoutUser }) => {
  const [profiledata, setProfileData] = useState('');
  const [registeredData, setRegisteredData] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [eventRegistered, setEventRegistered] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [userQrValue, setUserQrValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;

    getDoc(doc(db, 'users', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        const fetched = snap.data();
        setProfileData(fetched);
      } else {
        console.log('Data does not exist');
      }
    }).catch(err => {
      console.log('An error occured', err)
    })

    getDoc(doc(db, 'registered', user.user.uid)).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setRegisteredData(data);
        setEventRegistered(data.eventParticipation);
        setIsRegistered(true);
      } else {
        setInfoMessage('You have not registered in any events yet!')
      }
    })
      .catch(err => console.log('An error occured', err))
      .finally(() => { setLoading(false) })
  }, [user])

  useEffect(() => {
    if (infoMessage.length === 0) return;
    setTimeout(() => {
      setInfoMessage('');
    }, 5000)
  }, [infoMessage])

  useEffect(() => {
    if (profiledata) {
      setUserQrValue("Name " + profiledata.firstName + " " + profiledata.lastName + ", Registration Id " + user.user.uid + " " + "College " + profiledata.college + " Event Registered " + eventRegistered)
    }
  }, [profiledata])

  return (
    <div className={styles1.profile}>
      <div className='container'>
        <header className={cx('page-header', styles1.header)}>
          <h2 className='heading'>
            Welcome <br />back {user.user.displayName}!
          </h2>
          <div className={styles1['header-btn-wrapper']}>
            <NavLink to='/update-profile' className={cx('btn', { ['secondary']: user.isProfileComplete })}>
              {user.isProfileComplete
                ? <span className='btn-subtitle'>Need changes?</span>
                : <span className='btn-subtitle'>Your profile is incomplete</span>}
              <span className='btn-text'>Update Profile</span>
              <UpdateIcon />
            </NavLink>
          </div>
          <div className='subtitle'>
            <h4>{user.user.email}</h4>
            <div className={styles1['subtitle-btn-wrapper']}>
              <button className='btn secondary' onClick={(e) => { e.preventDefault(); logoutUser() }} >
                <span className='btn-subtitle'>We'll meet again</span>
                <span className='btn-text'>Logout</span>
                <LogoutIcon />
              </button>
            </div>
          </div>
        </header>
        <main>
          <section className={styles1['profile-section']}>
            <h2 className={styles1.heading}>Registration details</h2>

            {loading ? <p>Please wait...</p> : isRegistered ? (
              <div className={styles1.confirmation}>
                <EventFigure figureSrc={eventRegistered && events1.find(event => event.id === eventRegistered).figureSrc}
                  title={eventRegistered && events1.find(event => event.id === eventRegistered).title} />

                <div className={styles1.user}>
                  <h3>Participant Details</h3>
                  <ul className={styles1['registration-details']}>
                    <li> <span className={cx(styles1.title, styles1.id)}> {user.user.uid} </span></li>
                    <li> <span className={styles1.title}>Name</span> <span> {`${profiledata.firstName} ${profiledata.lastName}`}</span></li>
                    <li> <span className={styles1.title}>Sex</span> <span> {profiledata.gender}</span></li>
                    <li> <span className={styles1.title}>Whatsapp#</span> <span>  {profiledata.contact}</span></li>
                    <li> <span className={styles1.title}>Address</span> <span> {profiledata.address}</span></li>
                    {registeredData.TeamName && <>
                      <li> <span className={styles1.title}>Team Name</span> <span> {registeredData.TeamName}</span></li>
                      <li> <span className={styles1.title}>Team Members</span> <span> {registeredData.TeamMebers}</span></li>
                    </>}
                  </ul>
                </div>
                <div className={styles1.qr}>
                  <QrCode value={userQrValue} />
                  <div className={styles1.ftr}>
                    <p>Autogenerated from www.atulyam23.com</p>
                    <p>Save this as a screenshot for the event</p>
                  </div>
                </div>

              </div>
            ) : (<h3>Unregistered</h3>)}

            <div className={styles1['btns-wrapper']}>
              <div className={styles1['btn-wrapper']}>
                <NavLink to='/events' className={cx('btn', { ['secondary']: !isRegistered })}>
                  <span className='btn-subtitle'>Events</span>
                  <span className='btn-text'>Full Event<br />Schedule</span>
                  <ScheduleIcon />
                </NavLink>
              </div>

              <div className={styles1['btn-wrapper']}>
                <NavLink to='/register' className={cx('btn', { ['secondary']: isRegistered })}>
                  {!isRegistered && <span className='btn-subtitle'>You haven't registered yet</span>}
                  {isRegistered && <span className='btn-subtitle'>Register for a different event</span>}
                  <span className='btn-text'>Register</span>
                  <RegisterIcon />
                </NavLink>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

const EventFigure = ({ title = '', figureSrc }) => (
  figureSrc && <article
    className={styles1['event-card']}>
    <figure className={styles1['img-wrapper']}>
      <img alt={title} src={figureSrc} />
    </figure>
    <main>
      <h3 className={styles1.title}>{title}</h3>
      <p>Atulyam'23 NITAP</p>
    </main>
  </article>
)

export default UserProfile;