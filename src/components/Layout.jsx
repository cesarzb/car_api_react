import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const Layout = () => {
  const { auth, saveToken } = useAuth();
  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/users/sign_out`, {
        method: "DELETE",
        headers: {
          Authorization: auth.accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        saveToken({ jwt: null, expiration: null });
        navigate("/cars", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="layout-elements">
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
        {auth.accessToken ? (
          <Link onClick={clickHandler}>Logout</Link>
        ) : (
          <Link to={`/login`} className="brand-link">
            Login
          </Link>
        )}
      </div>
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
