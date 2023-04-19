import { useEffect } from "react";
import { useLocation } from "react-router";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    const navEl = document.getElementById('nav');
    const translateNav = () => {
      const navOffset = heroEl.getBoundingClientRect().bottom;
      navEl.style.transform = navOffset <= 0
        ? 'translate3d(0px, 0px, 0px)'
        : 'translate3d(0px, ' + navOffset + 'px, 0px)'
    }

    if (heroEl) {
      translateNav();
      window.addEventListener('scroll', translateNav)
    } else {
      navEl.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  }, [location.pathname])

  return (
    <div className="__layout">
      <Navigation />
      <main className="page">
        {children}
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Layout;