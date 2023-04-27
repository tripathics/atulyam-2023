import { useRef } from "react";
import styles from './Carousel.module.scss';
import { ReactComponent as PointerIcon } from '../media/icons/right.svg';
import { ReactComponent as NarrowArrowIcon } from '../media/icons/narrow-arrow.svg';
import cx from 'classnames';

const CarouselCard = ({ imgSrc, name, roles }) => {
  return (
    <div className={styles['card-wrapper']}>

      <article className={styles.card}>
        <figure className={styles['card-visual']}>
          <img src={imgSrc} alt="" />
        </figure>
        <main className={styles['card-content']}>
          <h3 className={styles['card-heading']}>
            {name}
          </h3>
          <ul className={styles['card-footer']}>
            {roles.map((role, i) => (<li key={i + role}>
              <span className={styles.role}>{role}</span>
              {i < roles.length-1 && <span className={styles.sep} />}
            </li>))}
          </ul>
        </main>
      </article>
    </div>
  )
}

const Carousel = ({ cardsList = [] }) => {
  const cursorRef = useRef(null);
  const parentRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  const handleCursorTransit = (type) => {
    if (type === 'enter') {
      cursorRef.current.classList.add(styles['-visible']);
    } else {
      cursorRef.current.classList.remove(styles['-visible']);
    }
  }

  const handleCursorMove = (posX, posY) => {
    const bounds = parentRef.current.getBoundingClientRect();

    cursorRef.current.style.transform = `translate3D(${posX - bounds.left}px, ${posY - bounds.top}px, 0)`;

    if (posX - bounds.left < bounds.width / 2) {
      cursorRef.current.classList.add(styles['-rotate']);
    } else {
      cursorRef.current.classList.remove(styles['-rotate']);
    }
  }

  const slideCarousel = (e) => {
    e.preventDefault();
    const bounds = parentRef.current.getBoundingClientRect();
    let transitDir = 'prev'
    if (e.clientX - bounds.left < bounds.width / 2) {
      transitDir = 'prev';
    } else {
      transitDir = 'next';
    }
    const cardsContainer = cardsWrapperRef.current;
    cardsContainer.classList.add(styles['-sliding']);
    cardsContainer.classList.add(transitDir === 'next'
      ? styles['-transit-right']
      : styles['-transit-left']);

    setTimeout(() => {
      cardsContainer.classList.remove(styles['-sliding']);
      if (transitDir === 'next') {
        cardsContainer.appendChild(cardsContainer.removeChild(cardsContainer.firstChild))
      } else {
        cardsContainer.prepend(cardsContainer.removeChild(cardsContainer.lastChild))
      }
      cardsContainer.classList.remove(transitDir === 'next'
        ? styles['-transit-right']
        : styles['-transit-left']);
    }, 300)
  }

  return (
    <div className={styles.carousel}
      ref={parentRef}
      onMouseEnter={e => handleCursorTransit('enter')}
      onMouseLeave={e => handleCursorTransit('leave')}
      onMouseMove={e => handleCursorMove(e.clientX, e.clientY)}
    >
      <div className={styles['c-cards-wrapper']}
        ref={cardsWrapperRef}
        onClick={slideCarousel}
      >
        {cardsList.map((card, i) =>
          <CarouselCard key={i} {...card} />
        )}
      </div>
      <div className={cx(styles['mobile-arrows'], 'container')}>
        <div className={styles.dir}><NarrowArrowIcon /></div>
        <div className={styles.dir}><NarrowArrowIcon /></div>
      </div>

      <div ref={cursorRef} className={styles['c-gallery-cursor']} aria-label="next/previous">
        <PointerIcon />
      </div>
    </div>
  )
}

export default Carousel;