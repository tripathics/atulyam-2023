import styles from './SupportLink.module.scss';
import cx from 'classnames';

const SupportLink = () => (
  <div className={styles.support}>
    For queries and technical support, join the <a className={cx('link', styles.link)} target='_blank' rel='noreferrer' href="https://chat.whatsapp.com/HmcowbF1mbG7DRJxti4X4X">
      Atulyam'23 Whatsapp community</a>
  </div>
)

export default SupportLink;