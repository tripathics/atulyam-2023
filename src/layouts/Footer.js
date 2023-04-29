import styles from '../styles/Footer.module.scss';
import logo from '../media/logo/atulyamLogo.png'
import sponsors from '../media/logo/echo_arunachal.png'
import bye from '../media/bye.png';
import cx from 'classnames'
import { ReactComponent as MailIcon } from '../media/icons/mail.svg';
import { ReactComponent as WAIcon } from '../media/icons/wa.svg';
import { useState } from 'react';

const Footer = () => {
  const [devTeam, setDevTeam] = useState(false);

  return (
    <footer className='container'>
      <div className={styles.MainFooterContent}>
        <div className={cx(styles.footerItems)} id="footerContent">
          <div className={styles.QuotesContainer}>
            <div className={styles.quotes}>Our cultural fest is a mosaic of traditions, where stories unfold, and memories are made</div>
          </div>

          <div>
            <div className={styles.LogoContainer}>
              <img src={logo} alt=""></img>
              <div className={styles.title}>Atulyam'23</div>
            </div>
          </div>
          <div className={styles['sponsor-wrapper']}>
            <div className={styles.sponsor}>
              <p style={{ textAlign: "center", fontSize: '1.2rem' }}>Media Partner</p>
              <img className={styles.sponsors} src={sponsors} alt=""></img>
            </div>
          </div>
        </div>
        <div className={styles.footerItems}>
          <div >
            <p>Contact us</p>
            <ul className={styles.SocialHandles}>
              <li className={cx(styles['handle-wrapper'], styles.growIcon)}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.facebook.com/atulyamnitap">
                  <svg role="presentation" aria-label="Facebook" aria-hidden="true">
                    <use href="/media/icons/sprite.svg#social-facebook"></use>
                  </svg>
                </a>
              </li>
              <li className={cx(styles['handle-wrapper'], styles.growIcon)}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="https://www.instagram.com/nitap_atulyam/">
                  <svg role="presentation" aria-label="Twitter" aria-hidden="true">
                    <use href="/media/icons/sprite.svg#social-instagram"></use>
                  </svg>
                </a>
              </li>
              <li className={cx(styles['handle-wrapper'], styles.growIcon)}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="mailto:atulyam@nitap.ac.in">
                  <MailIcon />
                </a>
              </li>
              <li className={cx(styles['handle-wrapper'], styles.growIcon)}>
                <a className={styles.handle} target='_blank' rel='noreferrer' href="https://chat.whatsapp.com/HmcowbF1mbG7DRJxti4X4X">
                  <WAIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.thanks}>
            <span>Thank you</span>
            <br />
            <span>for your support</span>

          </div>
          <div>
            <img src={bye} style={{ height: "220px", width: "auto" }} alt=""></img>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.team}>
          <span>
            Handcrafted with 🖤 by
            <button className={cx(styles.devteamBtn, {
              [styles.on]: devTeam
            })} onClick={(e) => { e.preventDefault(); setDevTeam(!devTeam) }}>
              Team4One
            </button>
          </span>
          <span className={styles.sep}>~</span>
          <span>&copy; 2023 Atulyam NIT Arunachal Pradesh</span>
          {devTeam && (
            <ul className={styles.devteam}>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/tripathics">@tripathics</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/pursottam6003">@pursottam6003</a></li>
              <li><a className={cx('link', styles.ln)} target='_blank' rel='noreferrer' href="https://github.com/daknya">@daknya</a></li>
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer