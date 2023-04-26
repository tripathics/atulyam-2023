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
  const { checkingStatus, authUser } = useAuthStatus();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!checkingStatus && !authUser.user) {
      return history('/signin', {state: {from: location.pathname}});
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