import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div class="layout-elements">
      <div className="header nav-links">
        <Link to={`/`} className="brand-link">
          Main page
        </Link>
        <Link to={`/brands`} className="brand-link">
          Brands list
        </Link>
        <Link to={`/cars`} className="brand-link">
          Cars list
        </Link>
      </div>
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
