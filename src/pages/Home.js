import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Home.module.scss';

import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';
import Carousel from '../components/Carousel';
import HighlightCard from '../components/HighlightCard';

import { events1 } from '../data/data';
import { mainCoordinators } from '../data/data'
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      <section className={cx('container', styles["intro-section"], styles['home-section'])}>
        <header className={cx(styles.introContent, styles.sectionHeader)}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Atulyam</span>
            <span className={styles._ar}>2023</span>
          </h2>
          <p className={styles.subtitle}>
            Atulyam is the annual cultural festival of NIT Arunachal Pradesh. A splendid idea realised by a group of students in 2012 at NITAP giving birth to Atulyam as we know it today.<br />
            After three years, we return with a more niwe and creative community than ever.
          </p>
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
            {events1.filter(event => event.highlight).map(event => <HighlightCard key={event.title} {...event} />)}
            <div className={styles['btn-wrapper']}>
                <NavLink to='/events' className='btn'>
                  <span className='btn-subtitle'>Events</span>
                  <span className='btn-text'>Full Event<br/>Schedule</span>
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
          <p className={cx(styles.subtitle, 'container')} id='coordinatorsList'>
            <span>
              Isabel Moranta Amelie Maia Victor Costa Simon D’haenens Mathieu Ducharme & Jérémy Minié Claudio Guglieri JP Burcks & Mia Pratevito Parker Peterson Adriano Esteves Rhodi Iliadou & Peter Ha Filippo Cipriani Pablo Stanley
            </span>
            <span>
              Franco Arza & Clément Roche Ali Hosseini Josh Kirk Diana Varma Vitaly Friedman Femke van Schoonhoven Nicolas Brassard-Ferron
            </span>
          </p>
        </header>
        <main>
          <Carousel cardsList={mainCoordinators} />
        </main>
      </section>
    </div>
  )
}

export default Home;