import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Home.module.scss';

import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';
import cosplayImg from '../media/cosplay.jpeg'
import dance from '../media/dance.jpeg'
import dj from '../media/dj.jpeg'
import filmMakingImg from '../media/film-making.jpeg'
import peasantry from '../media/peasantry.jpeg'
import soloSinger from '../media/singing.jpeg'
import Carousel from '../components/Carousel';

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
            <div className={styles.row}>
              <article className={styles.card}>
                <figure>
                  <img alt='' src={cosplayImg}/>
                </figure>
                <main>
                  <h3 className={styles.cardTitle}>Cosplay</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
              <article className={cx(styles.card, styles.rt)}>
                <figure>
                  <img alt='' src={peasantry} />
                </figure>
                <main>
                  <h3 className={styles.cardTitle}>Mr. and Ms. Atulyam</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adip''isicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
              <div className={styles.spacer}></div>
            </div>
            <div className={styles.row}>
              <div className={styles.spacer}></div>
              <article className={styles.card}>
                <figure><img alt='' src={soloSinger} /></figure>
                <main>
                  <h3 className={styles.cardTitle}>Solo singing</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
              <article className={cx(styles.card, styles.rt)}>
                <figure>
                  <img alt='' src={dj}/>
                </figure>
                <main>
                  <h3 className={styles.cardTitle}>Bollywood Night</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
            </div>
            <div className={styles.row}>
              <article className={styles.card}>
                <figure>
                  <img alt='' src={dance} />
                </figure>
                <main>
                  <h3 className={styles.cardTitle}>Modern Dance</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
              <article className={cx(styles.card, styles.rt)}>
                <figure>
                  <img alt='' src={filmMakingImg} />
                </figure>
                <main>
                  <h3 className={styles.cardTitle}>Short Film Making</h3>
                  <div className={styles.cardSubtitle}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia est quibusdam vero, placeat a magnam!
                  </div>
                </main>
              </article>
              <div className={styles['btn-wrapper']}>
                <NavLink to='/events' className='btn'>
                  <span className='btn-subtitle'>Events</span>
                  <span className='btn-text'>Full Event<br/>Schedule</span>
                  <ScheduleIcon />
                </NavLink>
              </div>
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