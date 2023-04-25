import { ReactComponent as InfoIcon } from '../media/icons/info.svg';
import { ReactComponent as WarningIcon } from '../media/icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../media/icons/error.svg';
import { ReactComponent as SuccessIcon } from '../media/icons/success.svg';
import styles from './Alert.module.scss';
import cx from 'classnames';

const Icon = ({ severity }) => {
  if (severity === 'success') return <SuccessIcon />
  else if (severity === 'warning') return <WarningIcon />
  else if (severity === 'error') return <ErrorIcon />
  else return <InfoIcon />
}

const Alert = ({ severity='info', message }) => {


  return (
    message && <div className={cx(styles['alert'], styles[severity])}>
      <div className={styles.icon}>
        <Icon severity={severity} />
      </div>
      {message}
    </div>
  )
}

export default Alert;