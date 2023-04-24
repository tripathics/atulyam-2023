import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Events from './pages/Events';
import Profile from "./form/Profile";
import SignIn from "./form/SignIn";
import EventRegistration from "./form/EventRegistration";
import { BrowserRouter } from "react-router-dom";
import './styles/index.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/events" element={
            <Events />
          } />
          <Route path="/profile" element={
            <Profile />
          } />

          <Route path="/signin" element={
            <SignIn />
          } />

          <Route path="/register" element={
            <EventRegistration/>
          } />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
