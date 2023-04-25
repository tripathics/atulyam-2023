import React, { useState } from 'react'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import {db} from '../config/config'
import { useEffect } from 'react'
import {ReactComponent as  UserIcon} from '../media/icons/user.svg'
import {ReactComponent as  EventsIcon} from '../media/icons/events.svg'

import '../styles/user.scss'

const UserProfile = ({ user, loginUser, logoutUser })  => {
  const [profiledata,setProfileData] = useState('') 

  console.log('user details',user.user);
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
}, [user])

console.log(profiledata)


  return (
    <> 
    <div className='container'>

      <div className='box'>
        <div>
        <div className="icon">< UserIcon/></div> <span className='titleContainer'>Username</span>
        <p>{profiledata.firstName}</p>
        </div>
        
        <div>
          <p className='titleContainer'>Institution Name</p>
          <div>{profiledata.college}</div>
        </div>

        <div>
        <div  className="icon">< EventsIcon/> <span  className='titleContainer'>Events Registered</span> </div> 
       
        </div>
      </div>

      <div className='box'>
        <div>
        Profile Details 
        
        <p> <span className='titleContainer'>Email:</span> {profiledata.email}</p>
        <p> <span className='titleContainer'>Contact</span>   {profiledata.contact}</p>
        <p> <span className='titleContainer'>Address</span>  {profiledata.address}</p>
        </div>

        <div> 
        <button className='Registerbtn register'> <a href="/register" className='link'>Register</a></button>
        <button className='Registerbtn' onClick={logoutUser()}> <a href="" className='link'>Logout</a></button>

        </div>
      </div>

      
    </div>
    </>
  )
}

export default UserProfile