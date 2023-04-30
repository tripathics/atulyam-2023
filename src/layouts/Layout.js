import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children, user }) => (
  <div className="__layout">
    <Navigation user={user} />
    <main className="page">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout;