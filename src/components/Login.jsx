import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Login.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { user: { email: email, password: password } };

    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        saveToken({
          jwt: response.headers.get("Authorization"),
          expiration: tomorrow,
        });
        navigate("/brands");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          {t("Email")}
        </label>
        <input
          id="email"
          className="form-input"
          value={email}
          onChange={handleChange}
        ></input>
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          {t("Password")}
        </label>
        <input
          id="password"
          className="form-input"
          type="password"
          value={password}
          onChange={handleChange}
        ></input>
      </div>

      <div className="link-group">
        <button className="login-btn">{t("Login")}</button>
        <Link to="/register">{t("Register")}</Link>
      </div>
    </form>
  );
};

export default Login;
