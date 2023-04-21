import CountdownTimer from '../components/CountdownTimer';
import styles from '../styles/Home.module.scss';
import cx from 'classnames';
import HeroVideo from '../media/medium.mp4';
import { ReactComponent as ScrollDownIcon } from '../media/icons/down.svg';
import { ReactComponent as ScheduleIcon } from '../media/icons/schedule.svg';
import { useEffect } from 'react';

import cosplayImg from '../media/cosplay.jpeg'
import filmMakingImg from '../media/film-making.jpeg'
import soloSinger from '../media/singing.jpeg'
import dj from '../media/dj.jpeg'
import peasantry from '../media/peasantry.jpeg'
import dance from '../media/dance.jpeg'
import { NavLink } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const heroLogoLetters = document.getElementsByClassName('shouldAnimate');
    const coordinatorNames = document.getElementById('coordinatorsList');

    const parallaxAnimate = () => {
      // animate hero logo letters
      const offsetTop = heroLogoLetters[0].offsetTop;
      const speed = 0.04;
      for (let i = 0; i < heroLogoLetters.length; i++) {
        /** @type {HTMLElement} */
        let el = heroLogoLetters[i];
        const shift = Math.abs(3 - i) * speed * (offsetTop - el.getBoundingClientRect().top);
        el.style.transform = 'translate3d(0, ' + shift.toFixed(3) + 'px, 0)';
      }

      // parallax animate coordinators
      let coordNamesTopOffset = coordinatorNames.getBoundingClientRect().top;
      coordinatorNames.style.transform = 'translate3d(0, ' + speed * coordNamesTopOffset.toFixed(3) + 'px, 0)';
    }

    if (heroLogoLetters.length > 0) {
      window.addEventListener('scroll', parallaxAnimate)
    }

    return () => {
      window.removeEventListener('scroll', parallaxAnimate)
    }
  }, [])

  return (
    <div>
      <div className={styles.hero} id="hero">
        <div className={styles.grain}></div>
        <video style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          minHeight: '100%',
          minWidth: '100%'
        }} autoPlay={true} muted={true} loop={true}>
          <source src={HeroVideo} />
        </video>
        <div className={styles.content}>
          <h1 className={styles.logo}>
            <span className='shouldAnimate'>A</span>
            <span className='shouldAnimate'>t</span>
            <span className='shouldAnimate'>u</span>
            <span className='shouldAnimate'>l</span>
            <span className='shouldAnimate'>y</span>
            <span className='shouldAnimate'>a</span>
            <span className='shouldAnimate'>m</span>
          </h1>
          <div className={styles.timeline}>
            <p>The countdown begins!</p>
            <CountdownTimer countdownDate={'May 5, 2023 9:00:00'} />
          </div>
        </div>
        <div className={styles.scrollDown} aria-hidden='true'>
          <ScrollDownIcon />
        </div>
      </div>
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

        <div>
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
        </div>
      </section>

      <section className={cx(styles['home-section'], 'container', styles.coordinators)}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: '3ch' }}>Our</span>
            <span className={styles._ar}>Team</span>
          </h2>
          <p className={styles.subtitle} id='coordinatorsList'>
            <span>
              Isabel Moranta Amelie Maia Victor Costa Simon D’haenens Mathieu Ducharme & Jérémy Minié Claudio Guglieri JP Burcks & Mia Pratevito Parker Peterson Adriano Esteves Rhodi Iliadou & Peter Ha Filippo Cipriani Pablo Stanley
            </span>
            <span>
              Franco Arza & Clément Roche Ali Hosseini Josh Kirk Diana Varma Vitaly Friedman Femke van Schoonhoven Nicolas Brassard-Ferron
            </span>
          </p>
        </header>
      </section>
    </div>
  )
}

export default Home;