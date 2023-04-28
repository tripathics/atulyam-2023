import { NavLink } from 'react-router-dom';
import styles from './HighlightCard.module.scss';

const HighlightCard = ({ figureSrc, title, desc, type, isRegistrationOpen, user }) => (
  <article className={styles.card}>
    <figure>
      <img alt='' src={figureSrc} />
    </figure>
    <main>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardSubtitle}>
        <div className={styles.desc}>{desc}</div>
        {type === 'Contest' && isRegistrationOpen ? (
          <div className={styles.type}>Registrations open</div>
        ) : <div className={styles.type}>{type}</div>}
      </div>
    </main>
    {type === 'Contest' && isRegistrationOpen && (
      user ? <NavLink className={styles.link} to='/register'>Register</NavLink>
        : <NavLink className={styles.link} to='/signup'>Register</NavLink>
    )}
  </article>
)

export default HighlightCard;

