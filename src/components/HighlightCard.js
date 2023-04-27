import styles from './HighlightCard.module.scss';
import cx from 'classnames';

const HighlightCard = ({ figureSrc, title, desc, type, isRegistrationOpen }) => {
  return (
    <article className={styles.card}>
      <figure>
        <img alt='' src={figureSrc} />
      </figure>
      <main>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardSubtitle}>
          <div className={styles.desc}>{desc}</div>

          {type === 'Contest' 
            ? <div className={cx(styles.type, { [styles.active]: isRegistrationOpen })}>
              {isRegistrationOpen ? 'Registrations open' : 'Registrations open soon'}
            </div> : <div className={styles.type}>{type}</div>}
        </div>
      </main>
    </article>
  )
}

export default HighlightCard;

