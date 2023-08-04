import styles from '../styles/Gallery.module.scss';
import cx from 'classnames';
import 'react-html5video/dist/styles.css'
import { motion } from 'framer-motion';

const Gallery = ({ user }) => {

  const Video = ({ embedId }) => {

    return (
      <div style={{
        overflow: "hidden",
        paddingBottom: "56.25%",
        position: 'relative',
        height: "50vh"
      }}>
        <iframe
          style={{
            left: "6%",
            top: "18%",
            height: "65%",
            width: "90%",
            position: "absolute"

          }}
          width="653"
          height="280"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope; pictures-in-picture"
          allowFullScreen
          title='Embeded Youtube'
        />
      </div>
    )

  }




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


        <div className={cx(styles['gallery'])}>
          <div className={cx(styles['h1'])}>
            <h1> DAY 1
            </h1>
            <p>4<sup>th</sup> May</p>
          </div>
          <div className='Video'>
            <Video embedId={"lG3S6VUt7AE"} />
          </div>



        </div>
        <br />
        <hr />
        <div className={cx(styles['gallery'])}>
          <div className={cx(styles['h1'])}>
            <h1> DAY 2
            </h1>
            <p>5<sup>th</sup> May</p>
          </div>
          <div className='Video'>

            <Video embedId={'xwGDkyz_LgI'} />
          </div>
        </div>
        <br />
        <hr />

        <div className={cx(styles['gallery'])}>
          <div className={cx(styles['h1'])}>
            <h1> DAY 3
            </h1>
            <p>6<sup>th</sup> May</p>
          </div>
          <div className='Video'>
            <Video embedId={"Mioso9Rv_N0"} />
          </div>

        </div>





      </main>
    </motion.div>
  )
}

export default Gallery;