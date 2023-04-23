import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Profile from "./form/Profile";
import SignIn from "./form/SignIn";
import EventRegistration from "./form/EventRegistration";
import { BrowserRouter } from "react-router-dom";
import './styles/index.scss';
import ProtectedComponent from "./components/ProtectedRoute";


import { auth} from "./config/config";
import { useAuthStatus } from "./hooks/hooks";

function App() {

  const [user, setUser] = useState({ user: null, admin: false });
  const { checkingStatus, loggedIn, admin } = useAuthStatus();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser({ user: null, admin: false });
      })
      .catch((err) => { console.log(err) });
  }

  const handleLogin = (user) => {
    setUser(user);
  }

  useEffect(() => {
    if (!checkingStatus) {
      setUser({ user: loggedIn, admin: admin });
    }
    // eslint-disable-next-line
  }, [checkingStatus])
  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/profile" element={
            // <Profile user={user} loginUser={handleLogin} logoutUser={handleLogout} />
            <ProtectedComponent isAdmin={false} children={<Profile user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

          <Route path="/signin" element={
            <SignIn user={user} loginUser={handleLogin} logoutUser={handleLogout}  />
          } />

          <Route path="/register" element={
            // <EventRegistration user={user}/>
            <ProtectedComponent isAdmin={false} children={<EventRegistration user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
