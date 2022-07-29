import NavBar from "../components/NavBar";

//Used to display the nav bar on every page

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default Layout;
