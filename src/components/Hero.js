import { useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { eventStartDate } from "../data/data";
import { ReactComponent as ScrollDownIcon } from '../media/icons/down.svg';
import HeroVideo from '../media/medium.mp4';
import styles from './Hero.module.scss';

const Hero = () => {  
  useEffect(() => {
    const heroLogoLetters = document.querySelectorAll('.shouldAnimate');
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
      window.addEventListener('scroll', parallaxAnimate);
    }

    return () => {
      window.removeEventListener('scroll', parallaxAnimate);
    }
  }, [])

  return (
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
          <CountdownTimer countdownDate={eventStartDate} />
        </div>
      </div>
      <div className={styles.scrollDown} aria-hidden='true'>
        <ScrollDownIcon />
      </div>
    </div>
  )
}

export default Hero;