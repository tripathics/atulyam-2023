import CountdownTimer from '../components/CountdownTimer';
import styles from '../styles/Home.module.scss';
import cx from 'classnames';
import HeroVideo from '../media/medium.mp4';
import { ReactComponent as ScrollDown } from '../media/icons/down.svg';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const parallaxEls = document.getElementsByClassName('shouldAnimate');
    const parallaxAnimate = () => {
      const offsetTop = parallaxEls[0].offsetTop;
      const speed = 0.04;
      for (let i = 0; i < parallaxEls.length; i++) {
        /** @type {HTMLElement} */
        let el = parallaxEls[i];
        const shift = Math.abs(3 - i) * speed * (offsetTop - el.getBoundingClientRect().top);
        el.style.transform = 'translate3d(0, '+ shift +'px, 0)';
      }
      const scrollDownIcon = document.getElementById('scrollDownIcon');

      let scrollDownIconTopOffset = scrollDownIcon.getBoundingClientRect().top
      if (scrollDownIconTopOffset >= 0) scrollDownIcon.style.opacity = (scrollDownIconTopOffset / window.innerHeight).toFixed(2);
    }

    if (parallaxEls.length > 0) {
      window.addEventListener('scroll', parallaxAnimate)
    }

    return () => {
      window.removeEventListener('scroll', parallaxAnimate)
    }
  }, [])

  return (
    <div>
      <div className={styles.hero} id="hero">
        <video style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          minHeight: '100%',
          minWidth: '100%'
        }} autoPlay={true} muted={true} loop={true}>
          <source src={HeroVideo} />
        </video>
        <div className={styles.grain}></div>
        <div className={styles.content}>
          <h1 className={styles.logo}>
            <span className='shouldAnimate'>A</span>
            <span className='shouldAnimate'>t</span>
            <span className='shouldAnimate'>u</span>
            <span className='shouldAnimate'>l</span>
            <span className='shouldAnimate'>y</span>
            <span className='shouldAnimate'>a</span>
            <span className='shouldAnimate'>m</span>
          </h1>
          <div className={styles.timeline}>
            <p>The countdown begins!</p>
            <CountdownTimer countdownDate={'May 3, 2023 9:00:00'} />
          </div>
        </div>
        <div className={styles.scrollDown} aria-hidden='true'>
          <ScrollDown id='scrollDownIcon' />
        </div>
      </div>
      <section className={cx('container', styles["intro-section"])}>
        <h1>Hello Atulyam 2023</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
      </section>
    </div>
  )
}

export default Home;