import { ReactComponent as InfoIcon } from '../media/icons/info.svg';
import { ReactComponent as WarningIcon } from '../media/icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../media/icons/error.svg';
import { ReactComponent as SuccessIcon } from '../media/icons/success.svg';
import { ReactComponent as CloseIcon } from '../media/icons/cross.svg';
import styles from './Alert.module.scss';
import cx from 'classnames';
import { useEffect, useState } from 'react';

const Icon = ({ severity }) => {
  if (severity === 'success') return <SuccessIcon />
  else if (severity === 'warning') return <WarningIcon />
  else if (severity === 'error') return <ErrorIcon />
  else return <InfoIcon />
}

const Alert = ({ severity='info', message='', handleDismiss=null }) => {
  const [alertMsg, setAlertMsg] = useState(message);

  useEffect(() => {
    if (!message) {
      setTimeout(() => {
        setAlertMsg(message);
      }, 1000)
      return;
    }
    setAlertMsg(message);
  }, [message])

  return (
    <div className={cx(
      styles.alert, 
      styles[severity],
      {[styles.active]: message.length > 0}
    )}>
      <div className={styles.icon}>
        <Icon severity={severity} />
      </div>
      <div className={styles.message}>
        {alertMsg}
      </div>
      {handleDismiss && <button type='button' className={styles.dismiss} onClick={handleDismiss}>
        <CloseIcon />
      </button>}
    </div>
  )
}

export default Alert;