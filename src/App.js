import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./form/Register";
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
          <Route path="/register" element={
            <Register />
          } />

          <Route path="/signin" element={
            <SignIn />
          } />

          <Route path="/eventregistation" element={
            <EventRegistration/>
          } />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
