import React from 'react'
import logo from '../media/logo/atulyambg.png'

const LinkComponent = ({ linkName, linkSrc }) => {
  return (
    <div style={{ padding: "5px" }}>
      <a href={linkSrc} className='link'>{linkName}</a>
    </div>
  )
}

const Footer = () => {

  const LinkItems = [
    { linkName: "Home", linkSrc: "", linkCount: 1 },
    { linkName: "Events", linkSrc: "", linkCount: 2 },
    { linkName: "Schedule", linkSrc: "", linkCount: 3 },
    { linkName: "Teams", linkSrc: "", linkCount: 4 },
    { linkName: "Sponsors", linkSrc: "", linkCount: 5 },
    { linkName: "Contact Us", linkSrc: "", linkCount: 6 },
  ]

  return (
    <footer>
      <div className='MainFooterContent'>
        <div className='footerContent' id="footerContent">
          <div className='QuotesContainer'>
            <div className='quotes'>CELEBRATING DIVERSITY THROUGH ART AND CULTURE</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap", alignItems: "center" }}>
              <div>
                <span style={{ paddingTop: "20px", fontSize: "26px" }}>Register For The Event Today </span>
                <button className='Registerbtn'> <a href="" className='link'>Register</a></button>
              </div>
            </div>
          </div>
          <div className='LogoContainer'>
            {/* <h2>Atylyam Logo  Todo</h2> */}
            <img src={logo} alt=""></img>
          </div>
        </div>
        <div className='footerItems'>
          <div>
            {LinkItems.filter(val => val.linkCount <= 3).map(val =>
              <LinkComponent key={val.linkName} {...val} />
            )}
          </div>
          <div>
            {LinkItems.filter(val => val.linkCount <= 3).map(val => (
              <LinkComponent key={val.linkName} {...val} />
            ))}
          </div>
          <div className='SocialHandles'>
            <p>Follow us on </p>
            <a href=""> <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.7 0H21.3C26.1 0 30 3.9 30 8.7V21.3C30 23.6074 29.0834 25.8203 27.4518 27.4518C25.8203 29.0834 23.6074 30 21.3 30H8.7C3.9 30 0 26.1 0 21.3V8.7C0 6.39262 0.916605 4.17974 2.54817 2.54817C4.17974 0.916605 6.39262 0 8.7 0ZM8.4 3C6.96783 3 5.59432 3.56893 4.58162 4.58162C3.56893 5.59432 3 6.96783 3 8.4V21.6C3 24.585 5.415 27 8.4 27H21.6C23.0322 27 24.4057 26.4311 25.4184 25.4184C26.4311 24.4057 27 23.0322 27 21.6V8.4C27 5.415 24.585 3 21.6 3H8.4ZM22.875 5.25C23.3723 5.25 23.8492 5.44754 24.2008 5.79918C24.5525 6.15081 24.75 6.62772 24.75 7.125C24.75 7.62228 24.5525 8.0992 24.2008 8.45083C23.8492 8.80246 23.3723 9 22.875 9C22.3777 9 21.9008 8.80246 21.5492 8.45083C21.1975 8.0992 21 7.62228 21 7.125C21 6.62772 21.1975 6.15081 21.5492 5.79918C21.9008 5.44754 22.3777 5.25 22.875 5.25ZM15 7.5C16.9891 7.5 18.8968 8.29018 20.3033 9.6967C21.7098 11.1032 22.5 13.0109 22.5 15C22.5 16.9891 21.7098 18.8968 20.3033 20.3033C18.8968 21.7098 16.9891 22.5 15 22.5C13.0109 22.5 11.1032 21.7098 9.6967 20.3033C8.29018 18.8968 7.5 16.9891 7.5 15C7.5 13.0109 8.29018 11.1032 9.6967 9.6967C11.1032 8.29018 13.0109 7.5 15 7.5ZM15 10.5C13.8065 10.5 12.6619 10.9741 11.818 11.818C10.9741 12.6619 10.5 13.8065 10.5 15C10.5 16.1935 10.9741 17.3381 11.818 18.182C12.6619 19.0259 13.8065 19.5 15 19.5C16.1935 19.5 17.3381 19.0259 18.182 18.182C19.0259 17.3381 19.5 16.1935 19.5 15C19.5 13.8065 19.0259 12.6619 18.182 11.818C17.3381 10.9741 16.1935 10.5 15 10.5Z" fill="white"></path></svg> </a>
            <a href=""><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.72727 0C1.23545 0 0 1.23545 0 2.72727V27.2727C0 28.7645 1.23545 30 2.72727 30H27.2727C28.7645 30 30 28.7645 30 27.2727V2.72727C30 1.23545 28.7645 0 27.2727 0H2.72727ZM2.72727 2.72727H27.2727V27.2727H20.1982V18.0682H23.7355L24.2468 13.9773H20.1995V11.3345C20.1995 10.1427 20.4914 9.33273 22.2014 9.33273H24.4173V5.625C24.0395 5.57727 22.7291 5.49682 21.2223 5.49682C18.0791 5.49682 15.9382 7.38818 15.9382 10.9091V13.9773H12.3586V18.0682H15.9368V27.2727H2.72727V2.72727Z" fill="white"></path></svg></a>
            <a href=""><svg width="30" height="30" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.3105 5.24125C31.1775 4.71975 30.7995 4.326 30.3672 4.20525C29.6025 3.99 25.875 3.5 18 3.5C10.125 3.5 6.401 3.99 5.62925 4.20525C5.20225 4.32425 4.82425 4.718 4.6895 5.24125C4.49875 5.98325 4 9.093 4 14C4 18.907 4.49875 22.015 4.6895 22.7605C4.8225 23.2803 5.2005 23.674 5.631 23.793C6.401 24.01 10.125 24.5 18 24.5C25.875 24.5 29.6007 24.01 30.3708 23.7948C30.7978 23.6758 31.1758 23.282 31.3105 22.7587C31.5013 22.0167 32 18.9 32 14C32 9.1 31.5013 5.985 31.3105 5.24125ZM34.7002 4.3715C35.5 7.49 35.5 14 35.5 14C35.5 14 35.5 20.51 34.7002 23.6285C34.2557 25.3523 32.9555 26.7085 31.3088 27.167C28.318 28 18 28 18 28C18 28 7.68725 28 4.69125 27.167C3.0375 26.7015 1.739 25.347 1.29975 23.6285C0.5 20.51 0.5 14 0.5 14C0.5 14 0.5 7.49 1.29975 4.3715C1.74425 2.64775 3.0445 1.2915 4.69125 0.833C7.68725 -3.12924e-07 18 0 18 0C18 0 28.318 -3.12924e-07 31.3088 0.833C32.9625 1.2985 34.261 2.653 34.7002 4.3715ZM14.5 20.125V7.875L25 14L14.5 20.125Z" fill="white"></path></svg></a>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>Copywrite &#169; since 2023 NIT Arunachal Pradesh </p>
      </div>
    </footer>
  )
}

export default Footer