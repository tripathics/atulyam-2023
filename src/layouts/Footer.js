import styles from '../styles/Footer.module.scss';
import logo from '../media/logo/updated_logo-removebg-preview.png';
import { ReactComponent as MailIcon } from '../media/icons/mail.svg';

const Footer = () => {
  return (
    <footer>
      <div className={styles.MainFooterContent}>
        <div className={styles.footerContent} id="footerContent">
          <div className={styles.QuotesContainer}>
            <div className={styles.quotes}>CELEBRATING DIVERSITY THROUGH ART AND CULTURE</div>   
          </div>
          <div className={styles.LogoContainer}>
            <img src={logo} alt=""></img>
          </div>
        </div>
        <div className={styles.footerItems}>
          <div >
            <p>Follow us</p>
            <ul className={styles.SocialHandles}>
              <li className={styles['handle-wrapper']}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.facebook.com/atulyamnitap">
                  <svg class="c-socials_icon" role="presentation" aria-label="Facebook" aria-hidden="true">
                    <use href="/media/icons/sprite.svg#social-facebook"></use>
                  </svg>
                </a>
              </li>
              <li className={styles['handle-wrapper']}>
              <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.instagram.com/nitap_atulyam/">
                <svg class="c-socials_icon" role="presentation" aria-label="Twitter" aria-hidden="true">
                  <use href="/media/icons/sprite.svg#social-instagram"></use>
                </svg>
              </a>
              </li>
              <li className={styles['handle-wrapper']}>
              <a className={styles.handle} target='_blank' rel='noreferrer' href="mailto:atulyam@nitap.ac.in">
                <MailIcon />
              </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2023 Atulyam NIT Arunachal Pradesh </p>
      </div>
    </footer>
  )
}

export default Footer