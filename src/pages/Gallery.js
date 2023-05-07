import styles from '../styles/Gallery.module.scss';
import cx from 'classnames';
import { motion } from 'framer-motion';

const Gallery = ({ user }) => {
  return (
    <motion.div className={cx(styles.events, 'page-transition', 'container')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header className={cx('page-header', styles['page-header'])}>
        <h1 className='heading'>
          <span>Gallery</span>
        </h1>
        <div className={cx('subtitle', styles['header-subtitle'])}>
          <h2>May.4-6</h2>
          <div>Atulyam'23 in reels</div>
        </div>
      </header>
      <main className={cx(styles['main-content'])}>
        
      </main>
    </motion.div>
  )
}

export default Gallery;