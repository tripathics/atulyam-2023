import { useState, useEffect } from "react";
import styles from './CountdownTimer.module.scss';

const CountdownTimer = ({countdownDate: toDate, handleTimerComplete}) => {
  const [seconds, setSeconds] = useState(6);
  const [minutes, setMinutes] = useState(69);
  const [hours, setHours] = useState(49);
  const [day, setDay] = useState(23);
  
  useEffect(() => {
    const countdownDate = new Date(toDate).getTime();
    const updateTimer = () => {
      if (!toDate) return;
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance <= 0) handleTimerComplete(true);
      const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);
      const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newDay = Math.floor(distance / (1000 * 60 * 60 * 24));
      if (newSeconds !== seconds) setSeconds(newSeconds);
      if (newMinutes !== minutes) setMinutes(newMinutes);
      if (newHours !== hours) setHours(newHours);
      if (newDay !== day) setDay(newDay);
      setTimeout(updateTimer, 1000);
    }
    updateTimer();
    // eslint-disable-next-line 
  }, [toDate])

  return (
      <div className={styles.timer}>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>
            {day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>
            {hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>
            {minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles['counter-wrapper']}>
          <div className={styles.counter}>
            {seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
  )
}

export default CountdownTimer;