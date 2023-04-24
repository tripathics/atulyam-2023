import styles from './HighlightCard.module.scss';

const HighlightCard = ({ figureSrc, title, desc }) => {
  return (
    <article className={styles.card}>
      <figure>
        <img alt='' src={figureSrc} />
      </figure>
      <main>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardSubtitle}>
          {desc}
        </div>
      </main>
    </article>
  )
}

export default HighlightCard;

