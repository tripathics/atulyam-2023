import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedComponent from "../components/ProtectedRoute";
import Home from "./Home";
import Events from "./Events";
import Register from "./Register";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UpdateProfile from "./UpdateProfile";
import UserProfile from "./UserProfile";

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes({ authUser, updateAuthUserAttr, handleLogout }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register"
          element={<ProtectedComponent
            isAdmin={false}
            children={<Register user={authUser} />}
          />}
        />
        <Route path="/update-profile"
          element={<ProtectedComponent
            isAdmin={false}
            children={<UpdateProfile updateProfile={updateAuthUserAttr} user={authUser} />}
          />}
        />
        <Route path="/signin" element={<SignIn user={authUser} logoutUser={handleLogout} />} />
        <Route path="/signup" element={<SignUp user={authUser} logoutUser={handleLogout} />} />
        <Route path="/user" element={
          <ProtectedComponent isAdmin={false} children={<UserProfile user={authUser} logoutUser={handleLogout} />} />
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;