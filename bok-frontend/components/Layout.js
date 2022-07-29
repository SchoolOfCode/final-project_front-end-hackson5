import NavBar from "../components/NavBar"

function Layout({ children }) {
  return (
    <div>   
    <NavBar />
    {children}
    </div>
  )
}

export default Layout