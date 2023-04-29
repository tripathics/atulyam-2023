import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Home.module.scss';

import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';
import { ReactComponent as LinkIcon } from '../media/icons/link.svg';
import Carousel from '../components/Carousel';
import HighlightCard from '../components/HighlightCard';

import { events, highlights } from '../data/data';
import { mainCoordinators, coordinators } from '../data/data'
import Hero from '../components/Hero';
import { motion } from 'framer-motion'

const tags = [
  'cosplay', 'fun', 'poetry', 'face painting', 'solo song', 'dance', 'essay', 'sketching',
  'concert', 'flash mob', 'film making', 'joy', 'concert', 'dj', 'poetry slam'
]

const Home = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <section className={cx(styles["intro-section"], styles['home-section'])}>
        <div className={styles['intro-bg']}>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => <span key={i}>{tag} </span>)}
          </div>
        </div>
        <header className={cx(styles.introContent, styles.sectionHeader, 'container')}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Atulyam</span>
            <span className={styles._ar}>2023</span>
          </h2>
          <p className={styles.subtitle}>
            Atulyam is the annual cultural festival of NIT Arunachal Pradesh. A splendid idea realised by a group of students in 2012 at NITAP giving birth to Atulyam as we know it today.<br />
            After three years, we return with a more niwe and creative community than ever.
          </p>
          <div className={styles['header-btn-wrapper']}>
            {user ? (
              <NavLink to='/register' className={cx('btn', styles['intro-header-btn'])}>
                <span className={cx('btn-subtitle', styles['intro-btn-subtitle'])}>Events registration open</span>
                <span className={cx('btn-text', styles['intro-btn-text'])}>Register<br />now!</span>
                <LinkIcon />
              </NavLink>
            ) : <NavLink to='/signup' className={cx('btn', styles['intro-header-btn'])}>
            <span className={cx('btn-subtitle', styles['intro-btn-subtitle'])}>Events registration open</span>
            <span className={cx('btn-text', styles['intro-btn-text'])}>Register<br />now!</span>
            <LinkIcon />
          </NavLink> }
          </div>
        </header>
      </section>

      <section className={cx(styles['home-section'], 'container', styles.highlights)}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.heading}>
            <span>Highlights</span>
          </h2>
        </header>

        <main>
          <div className={styles.hlgallery}>
            {highlights.map(id => <HighlightCard user={user} key={id} {...events[id]} />)}
            <div className={styles['btn-wrapper']}>
              <NavLink to='/events' className='btn'>
                <span className='btn-subtitle'>Events</span>
                <span className='btn-text'>Full Event<br />Schedule</span>
                <ScheduleIcon />
              </NavLink>
            </div>
          </div>
        </main>
      </section>

      <section className={cx(styles['home-section'], styles.coordinators)}>
        <header className={cx(styles.sectionHeader, 'container')}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Our</span>
            <span className={styles._ar}>Team</span>
          </h2>
          <div className={cx(styles.subtitle, 'container')} id='coordinatorsList'>
            <ul>
              {coordinators.filter((val, i) => i <= 22).map(val => <li key={val.name}> {val.name}</li>)}
            </ul>
            <ul>
              {coordinators.filter((val, i) => i > 22).map(val => <li key={val.name}> {val.name}</li>)}
            </ul>
          </div>
        </header>
        <main>
          <Carousel cardsList={mainCoordinators} />
        </main>
      </section>
    </motion.div>
  )
}

export default Home;