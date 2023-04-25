import React from 'react'
import cx from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import {auth,db} from '../config/config'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { ReactComponent as ErrorIcon } from '../media/icons/error.svg'
import { ReactComponent as SucesssIcon } from '../media/icons/sucess.svg'
import styles from '../styles/Home.module.scss'
import '../styles/admin.scss'
import {useFetchCollection} from '../hooks/hooks'


const AdminComponent = ({user}) => {
  const { docs, fetching, refetch } = useFetchCollection('registered');
  const [filter, setFilter] = useState('All');
  
  useEffect(() => {
    if (fetching) return;
    console.log(docs)
  }, [fetching])


const handlechange=(e)=>{  

  console.log(e.target.value)
}

  return (
    <> 
        <section className={cx('container', styles["intro-section"], styles['home-section'])}>
        <header className={cx(styles.introContent, styles.sectionHeader)}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Atulyam</span>
            <span className={styles._ar}>Admin</span>
          </h2>
          <p className={styles.subtitle}>
            The  Admin Portal for ATULYAM 2023
            Atulyam is the annual cultural festival of NIT Arunachal Pradesh.  <br />
            After three years, we return with  great evnets and hoping for great success.

          </p>
        </header>
      </section>

      <div className='container'>

      <div className='FormLabel'>
          <div className='event'>
                  <label htmlFor="events">Event Details</label> 
                  <br/>
                  <select required className='halfInput'  onChange={(e)=>{handlechange(e)}} style={{padding:"4px 12px"}}  name="events"  id="events">
                  <option defaultValue={"allEvents"} value="allEvents">All Events </option>
                  <option value="Modern Dance">Modern Dance</option>
                  <option value="Quize">Quize </option> 
                  <option value ="Poetry Slam">Poetry Slam</option>
                  <option value="Painting">Painting</option> 
                  <option value="Short Film Making">Short Film Making</option>
                  <option value ="Essay">Essay</option>
                  <option value ="Solo Song"> Solo Song</option>
                  </select>  
          </div>
          <div>
            {/* {!fetching && docs && (
              
            )} */}
          </div>
        </div>
      </div>
     

        
    </>

  )
}

export default AdminComponent