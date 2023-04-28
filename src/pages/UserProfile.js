import React, { useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../config/config'
import { useEffect } from 'react'
import { motion } from 'framer-motion';
import { ReactComponent as LogoutIcon } from '../media/icons/logout.svg'
import { ReactComponent as RegisterIcon } from '../media/icons/register.svg'
import { ReactComponent as UpdateIcon } from '../media/icons/update.svg'
import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';


import QrCode from '../components/qrCode'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Profile.module.scss'
import '../styles/user.scss'
import cx from 'classnames'
import { events } from '../data/data'


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
    if (profiledata && eventRegistered) {
      const qrStr = `Name ${profiledata.firstName} ${profiledata.lastName}, Registration Id ${user.user.uid} College ${profiledata.college} Event Registered ${events[eventRegistered]}`
      setUserQrValue(qrStr);
    }
  }, [profiledata])

  return (
    <motion.div className={cx(styles.profile, 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className='container'>
        <header className={cx('page-header', styles.header)}>
          <h2 className='heading'>
            Welcome <br />back {user.user.displayName}!
          </h2>
          <div className={styles['header-btn-wrapper']}>
            <NavLink to='/update-profile' className={cx('btn', { secondary: user.isProfileComplete })}>
              {user.isProfileComplete
                ? <span className='btn-subtitle'>Need changes?</span>
                : <span className='btn-subtitle'>Your profile is incomplete</span>}
              <span className='btn-text'>Update Profile</span>
              <UpdateIcon />
            </NavLink>
          </div>
          <div className='subtitle'>
            <h4>{user.user.email}</h4>
            <div className={styles['subtitle-btn-wrapper']}>
              <button className='btn secondary' onClick={(e) => { e.preventDefault(); logoutUser() }} >
                <span className='btn-subtitle'>We'll meet again</span>
                <span className='btn-text'>Logout</span>
                <LogoutIcon />
              </button>
            </div>
          </div>
        </header>
        <main>
          <section className={styles['profile-section']}>
            <h2 className={styles.heading}>Registration details</h2>

            {loading ? <p>Please wait...</p> : user.isProfileComplete && isRegistered ? (
              <div className={styles.confirmation}>
                {eventRegistered && events[eventRegistered].figureSrc && (
                  <EventFigure figureSrc={events[eventRegistered].figureSrc} title={events[eventRegistered].title} />
                )}
                <div className={styles.user}>
                  <h3>Participant Details</h3>
                  <ul className={styles['registration-details']}>
                    <li> <span className={cx(styles.title, styles.id)}> {user.user.uid} </span></li>
                    <li> <span className={styles.title}>Name</span> <span> {`${profiledata.firstName} ${profiledata.lastName}`}</span></li>
                    <li> <span className={styles.title}>Sex</span> <span> {profiledata.gender}</span></li>
                    <li> <span className={styles.title}>Whatsapp#</span> <span>  {profiledata.contact}</span></li>
                    <li> <span className={styles.title}>Address</span> <span> {profiledata.address}</span></li>
                    {registeredData.TeamName && <>
                      <li> <span className={styles.title}>Team Name</span> <span> {registeredData.TeamName}</span></li>
                      <li> <span className={styles.title}>Team Members</span> <span> {registeredData.TeamMebers}</span></li>
                    </>}
                  </ul>
                </div>
                <div className={styles.qr}>
                  <QrCode value={userQrValue} />
                  <div className={styles.ftr}>
                    <p>Autogenerated at www.atulyam23.com</p>
                    <p>Save the screenshot of registration confirmation</p>
                  </div>
                </div>

              </div>
            ) : (<h3>Unregistered</h3>)}

            <div className={styles['btns-wrapper']}>
              <div className={styles['btn-wrapper']}>
                <NavLink to='/events' className={cx('btn', { secondary: !isRegistered })}>
                  <span className='btn-subtitle'>Events</span>
                  <span className='btn-text'>Full Event<br />Schedule</span>
                  <ScheduleIcon />
                </NavLink>
              </div>

              <div className={styles['btn-wrapper']}>
                <NavLink to='/register' className={cx('btn', { secondary: isRegistered })}>
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
    </motion.div>
  )
}

const EventFigure = ({ title = '', figureSrc }) => (
  figureSrc && <article
    className={styles['event-card']}>
    <figure className={styles['img-wrapper']}>
      <img alt={title} src={figureSrc} />
    </figure>
    <main>
      <h3 className={styles.title}>{title}</h3>
      <p>Atulyam'23 NITAP</p>
    </main>
  </article>
)

export default UserProfile;