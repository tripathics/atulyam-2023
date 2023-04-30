import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingPage } from './Loading';

const UnauthorizedComponent = () => (
  <div className='container' style={{
    marginTop: 'var(--nav-height)',
    fontFamily: '\'Antonio\'',
    fontSize: '6vw',
    textAlign: 'center'
  }}>
    <h1>401</h1>
    <h2>Unauthorized</h2>
  </div>
)

const ProtectedComponent = ({ children, isAdmin, checkingStatus, authUser }) => {
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!checkingStatus && !authUser.user) {
      return history('/signin', { state: { from: location.pathname } });
    }
  })

  return (
    checkingStatus ? <LoadingPage /> : (<>
      {authUser.user && (<>
        {!isAdmin ? <>{children}</> : (<>
          {authUser.admin ? <>{children}</> : <UnauthorizedComponent />}
        </>)}
      </>)}
    </>)
  )
};

export default ProtectedComponent;