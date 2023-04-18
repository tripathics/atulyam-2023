import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
