import { NavLink } from 'react-router-dom';
import styles from '../styles/Events.module.scss';
import cx from 'classnames';
import { events } from '../data/data';
import { useEffect, useRef } from 'react';

const Events = () => {
  const currentEventFigure = useRef(null);
  const eventFigureWrapper = useRef(null);

  useEffect(() => {
  const wrapper = eventFigureWrapper.current;
  const figure = currentEventFigure.current;

  const stickEventFigure = () => {
    const stickFigure = entry => {
      if (entry.getBoundingClientRect().top > (window.innerHeight - figure.getBoundingClientRect().width)) {
        figure.style.position = 'absolute';
        figure.style.top = '0';
      } else if (entry.getBoundingClientRect().bottom > window.innerHeight) {
        figure.style.position = 'fixed';
        figure.style.bottom = '0';
        figure.style.top = 'unset';
      } else {
        figure.style.position = 'absolute';
        figure.style.bottom = '0';
        figure.style.top = 'unset';
      }
    }

    stickFigure(wrapper);
  }

  window.addEventListener('scroll', stickEventFigure)

  return () => {
    window.removeEventListener('scroll', stickEventFigure);
  }
}, [])
  
  return (
    <div className={styles.events}>
      <header className='page-header container'>
        <h1 className='heading'>
          <span>Event</span>
          <span>Schedule</span>
        </h1>
        <div className={cx(styles['header-btn-wrapper'])}>
          <NavLink to='/register' className='btn'>
            <span className='btn-subtitle'>Events registration open</span>
            <span className='btn-text'>Register<br />now!</span>
          </NavLink>
        </div>
        <div className={cx('subtitle', styles['header-subtitle'])}>
          <h2>May.5-7</h2>
          <div>2023</div>
        </div>
      </header>
      <main className={cx(styles['main-content'], 'container')}>
        <nav className={styles['schedule-nav']}>
          <ul className={styles.tabs}>
            <li className={cx(styles.tab, styles.active)}>
              <div>Fri.</div>
            </li>
            <li className={styles.tab}>
              <div>Sat.</div>
            </li>
            <li className={styles.tab}>
              <div>Sun.</div>
            </li>
          </ul>
        </nav>
        <section ref={eventFigureWrapper} className={styles['event-list-wrapper']}>
          <ul className={styles['event-list']}>
            {events.map((eventDetails, i) => {
              const { title, time, venue } = eventDetails;
              return <li key={i} className={styles['event-li']}>
                <article className={styles['event-li-inner']}>
                  <div className={styles.title}>
                    <h4>{title}</h4>
                  </div>
                  <div className={styles.venue}>
                    <p>{venue}</p>
                  </div>
                  <div className={styles.time}>
                    <p>{time}</p>
                  </div>
                </article>
              </li>
            })}
          </ul>
          <div className={styles['event-figures']}>
            <article ref={currentEventFigure} className={styles['current-figure']}>
              <figure className={styles['img-wrapper']}>
                <img alt='' src={'https://conference.awwwards.com/uploads/speakers/speaker-amelie-ok-960x960.jpg'} />
              </figure>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Events;