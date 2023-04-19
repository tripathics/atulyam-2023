import { useEffect } from "react";
import { useLocation } from "react-router";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    const navEl = document.getElementById('nav');
    const heroEl = document.getElementById('hero');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navEl.style.position = 'absolute';
          navEl.style.top = '100vh';
        } else {
          navEl.style.position = 'fixed';
          navEl.style.top = '0';
        }
      })
    })
    
    if (location.pathname === '/') {
      observer.observe(heroEl);
    } else {
      observer.disconnect()
      navEl.style.position = 'fixed';
      navEl.style.top = '0';
    }
  }, [location.pathname])

  return (
    <div className="__layout">
      <Navigation />
      <main className="page">
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;