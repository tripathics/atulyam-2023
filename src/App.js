import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import './styles/index.scss';
import Alert from './components/Alert';

import { auth } from "./config/config";
import { useAuthStatus } from "./hooks/hooks";
import ScrollToTop from "./utils/helper";
import AnimatedRoutes from "./pages/AnimatedRoutes";

function App() {
  const { checkingStatus, authUser, updateAuthUserAttr } = useAuthStatus();
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(null);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setAlertMsg('Signed out!')
      })
      .catch((err) => {
        setAlertMsg(err.message);
        setAlertSeverity('error');
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setAlertMsg('');
      setAlertSeverity(null);
    }, 5000);
  }, [alertMsg])

  return (
    <Layout user={authUser}>
      {alertSeverity ? <Alert message={alertMsg} /> : <Alert message={alertMsg} severity={alertSeverity} />}
      <AnimatedRoutes authUser={authUser} handleLogout={handleLogout} updateAuthUserAttr={updateAuthUserAttr} checkingStatus={checkingStatus} />
    </Layout>
  );
}

export default App;
