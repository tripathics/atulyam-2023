import { NavLink } from "react-router-dom";
import './Navigation.scss';

const links = [
  { link: '/events', name: 'What\'s on' },
  { link: '/register', name: 'Register' },
]

const NavItem = ({name, link}) => (
  <NavLink to={link} className='router-link'>
    {name}
  </NavLink>
)

const Navigation = () => {
  return (
    <nav className="nav" id="nav">
      <div className="logo">
        <NavLink to={'/'}>
          <span>ATULYAM</span>
        </NavLink>
      </div>
      <div className="router-links">
        <div className="desktop">
          {links.map(link => <NavItem key={link.name} {...link} />)}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;