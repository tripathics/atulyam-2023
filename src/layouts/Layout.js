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
          navEl.style.top = '90vh';
        } else {
          navEl.style.position = 'fixed';
          navEl.style.top = '0';
        }
      })
    })

    


    // const translateNav = () => {
    //   const heroEl = document.getElementById('hero');
    //   const navEl = document.getElementById('nav');
    //   if (!heroEl) {
    //     navEl.style.position = 'absolute';
    //     navEl.style.top = '0';
    //     return;
    //   }
    //   const heroOffset = heroEl.getBoundingClientRect().bottom;
    //   if (heroOffset > 0) {
    //     navEl.style.position = 'absolute';
    //     navEl.style.top = '90vh';
    //   } else {
    //     navEl.style.position = 'fixed';
    //     navEl.style.top = '0';
    //   }
    // }

    // translateNav();
    if (location.pathname === '/') {
      observer.observe(heroEl)
      // window.addEventListener('scroll', translateNav);
    } else {
      observer.disconnect()
      navEl.style.position = 'fixed';
      navEl.style.top = '0';
      // window.removeEventListener('scroll', translateNav);
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