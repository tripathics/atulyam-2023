import React, { useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../config/config'
import { useEffect } from 'react'
import { ReactComponent as UserIcon } from '../media/icons/user.svg'
import { ReactComponent as EventsIcon } from '../media/icons/events.svg'
import { ReactComponent as CollegeIcon } from '../media/icons/college.svg'
import { NavLink } from 'react-router-dom'

import styles from '../styles/Events.module.scss'
import '../styles/user.scss'
import cx from 'classnames'
import Alert from '../components/Alert'


const UserProfile = ({ user, loginUser, logoutUser }) => {
  const [profiledata, setProfileData] = useState('');
  const [eventRegistered, setRegistered] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  }

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
        console.log(data.eventParticipation);
        setRegistered(data.eventParticipation);
      } else {
        setInfoMessage('You have not registered in any events yet!')
      }
    })
    .catch(err => console.log('An error occured', err))
  }, [user])

  useEffect(() => {
    if (infoMessage.length === 0) return;
    setTimeout(() => {
      setInfoMessage('');
    }, 5000)
  }, [infoMessage])

  return (
    <div className='container'>
      <Alert severity='info' message={infoMessage} />
      <div className='box'>
        <div>
          <div className="icon">< UserIcon /></div> <span className='titleContainer'>Username</span>
          <p>{profiledata.firstName}</p>
        </div>
        <div>
          <div className="icon">< CollegeIcon /></div> <span className='titleContainer'>Institution</span>
          <div>{profiledata.college}</div>
        </div>
        <div>
          <div className="icon">< EventsIcon /></div> <span className='titleContainer'>Events Registered</span>
          <div>  {eventRegistered ? eventRegistered : "None"} </div>
        </div>
      </div>
      <div className='box'>
        <div className='profile'>
          <h2>   Profile Details </h2>
          <p> <span className='titleContainer'>Email:</span> {profiledata.email}</p>
          <p> <span className='titleContainer'>Contact</span>   {profiledata.contact}</p>
          <p> <span className='titleContainer'>Address</span>  {profiledata.address}</p>
        </div>
        <div>
          <div className={cx(styles['header-btn-wrapper'])}>
            <NavLink to='/register' className='btn'>
              <span className='btn-subtitle'>Events registration open</span>
              <span className='btn-text'>Register<br />now!</span>
            </NavLink>
          </div>
          <div className={cx(styles['header-btn-wrapper'])}>
            <NavLink to='/profile' className='btn'>
              <span className='btn-subtitle'>Need changes ?</span>
              <span className='btn-text'>Update<br />profile</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div>
        <button className='Registerbtn' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default UserProfile