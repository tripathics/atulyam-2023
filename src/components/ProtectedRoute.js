import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingPage } from './Loading';
import { useAuthStatus } from '../hooks/hooks';

const UnauthorizedComponent = () => (
  <div className='container'>
    <h1>401</h1>
    <h2>Unauthorized</h2>
  </div>
)

const ProtectedComponent = ({ children, isAdmin }) => {
  const { checkingStatus, loggedIn, admin } = useAuthStatus();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!checkingStatus && !loggedIn) {
      return history('/signin', {state: {from: location.pathname}});
    }
  })

  return (
    checkingStatus ? <LoadingPage /> : (<>
      {loggedIn && (<>
        {!isAdmin ? <>{children}</> : (<>
          {admin ? <>{children}</> : <UnauthorizedComponent />}
        </>)}
      </>)}
    </>)
  )
};

export default ProtectedComponent;