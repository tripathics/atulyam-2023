import { useState, useEffect } from "react";
import styles from './CountdownTimer.module.scss';

const CountdownTimer = ({countdownDate: toDate}) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const updateTimer = () => {
      if (!toDate) return;
      const countdownDate = new Date(toDate).getTime();
      const now = new Date().getTime();
      setDistance(countdownDate - now)
      console.log('update timer')
    }

    updateTimer();
    const updateInterval = setInterval(() => {
      updateTimer();
    }, 1000)

    return () => {
      clearInterval(updateInterval);
    }
  }, [toDate])

  return (
    distance &&
      <div className={styles.timer}>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>{Math.floor(distance / (1000 * 60 * 60 * 24)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>{Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>{Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>{Math.floor((distance % (1000 * 60)) / 1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
  )
}

export default CountdownTimer;