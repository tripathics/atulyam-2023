import styles from '../styles/Footer.module.scss';
import logo from '../media/logo/atulyamLogo.png'
import sponsors from '../media/logo/echo_arunachal.png'
import bye from '../media/bye.png';
import cx from 'classnames'
import { ReactComponent as MailIcon } from '../media/icons/mail.svg';

const Footer = () => {
  return (
    <footer>
      <div className={styles.MainFooterContent}>
        <div className={styles.footerContent} id="footerContent">
          <div className={styles.QuotesContainer}>
            <div className={styles.quotes}>Our cultural fest is a mosaic of traditions, where stories unfold, and memories are made</div>   
          </div>

          <div className={styles.LogoContainer}>
            <img src={logo} alt=""></img>
            <div className={styles.title}>Atulyam '23</div>

          </div>
          <div>
            <p style={{textAlign:"center"}}>Media Patner</p>
          <img  className={styles.sponsors} src={sponsors} alt=""></img>
          </div>
        </div>
        <div className={styles.footerItems}>
          <div >
            <p>Follow us</p>
            <ul className={styles.SocialHandles}>
              <li className={cx( styles['handle-wrapper'],styles.growIcon)}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.facebook.com/atulyamnitap">
                  <svg class="c-socials_icon" role="presentation" aria-label="Facebook" aria-hidden="true">
                    <use href="/media/icons/sprite.svg#social-facebook"></use>
                  </svg>
                </a>
              </li>
              <li className={cx( styles['handle-wrapper'],styles.growIcon)}>
              <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.instagram.com/nitap_atulyam/">
                <svg class="c-socials_icon" role="presentation" aria-label="Twitter" aria-hidden="true">
                  <use href="/media/icons/sprite.svg#social-instagram"></use>
                </svg>
              </a>
              </li>
              <li className={cx( styles['handle-wrapper'],styles.growIcon)}>
              <a className={styles.handle} target='_blank' rel='noreferrer' href="mailto:atulyam@nitap.ac.in">
                <MailIcon />
              </a>
              </li>
            </ul>
          </div>

          <div className={styles.thanks}>
            <span>Thank you</span> 
            <br/>
            <span>for your support</span>

          </div>
          <div>
            <img src={bye} style={{width:"300px"}} alt=""></img>
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