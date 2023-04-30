import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children, user }) => (
  <div className="__layout">
    <Navigation user={user.user} admin={user.admin} />
    <main className="page">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout;