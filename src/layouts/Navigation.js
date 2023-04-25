import { NavLink } from "react-router-dom";
import styles from './Navigation.module.scss';
import cx from 'classnames';

const links = [
  { link: '/events', name: 'What\'s on' },
  { link: '/register', name: 'Register' },
  { link: '/user',name:'Profile'}
]

const NavItem = ({ name, link }) => (
  <NavLink to={link} className={state => cx(
    styles['router-link'], 'link',
    { [styles.active]: state.isActive }
  )}>
    {name}
  </NavLink>
)

const Navigation = () => {  
  return (
    <nav className={styles.nav} id="nav">
      <div className={styles.logo}>
        <NavLink to={'/'}>ATULYAM</NavLink>
      </div>
      <div className={styles["router-links"]}>
        <div className={styles.desktop}>
          {links.map(link => <NavItem key={link.name} {...link} />)}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;