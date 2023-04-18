import Navigation from "./Navigation";

const Layout = ({children}) => {
  return (
    <div className="__layout">
      <Navigation />
      <main className="page">
        {children}
      </main>
      {/* Footer */}
    </div>
  )
}

export default Layout;