import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import "../styles/Layout.css";
import { useState } from "react";
import { Briefcase, Home, ShoppingCart, Moon, Sun, User } from "react-feather";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { t } = useTranslation();

  const { auth, saveToken } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light-theme");

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

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  return (
    <div className={`layout ${theme}`}>
      <div className="navbar">
        <div className="top-nav">
          <Link to={`/`} className="nav-link">
            <Home />
            <span>{t("Main page")}</span>
          </Link>
          <Link to={`/brands`} className="nav-link">
            <Briefcase />
            <span>{t("Brands list")}</span>
          </Link>
          <Link to={`/cars`} className="nav-link">
            <ShoppingCart />
            <span>{t("Cars list")}</span>
          </Link>
        </div>
        <div className="bottom-nav">
          {auth.accessToken ? (
            <Link onClick={clickHandler} className="nav-link">
              <User />
              {t("Logout")}
            </Link>
          ) : (
            <Link to={`/login`} className="nav-link">
              <User />
              {t("Login")}
            </Link>
          )}
          <a className="theme-toggle" onClick={() => toggleTheme()}>
            {theme === "light-theme" ? <Moon /> : <Sun />}
          </a>
        </div>
      </div>
      <main className="main-content">
        <LanguageSelector />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
