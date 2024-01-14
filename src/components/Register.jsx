import { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "password-confirmation") {
      setPasswordConfirmation(e.target.value);
    }
  };

  const validatePassword = () => {
    return password === passwordConfirmation ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      console.log("Passwords don't match!");
      return;
    }

    const userData = {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch(`${API_URL}/users`, {
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

      <div className="form-field">
        <label htmlFor="password-confirmation" className="form-label">
          {t("Password Confirmation")}
        </label>
        <input
          id="password-confirmation"
          className="form-input"
          type="password"
          value={passwordConfirmation}
          onChange={handleChange}
        ></input>
      </div>

      <button className="register-btn">{t("Register")}</button>
      <Link to="/login">{t("Login")}</Link>
    </form>
  );
};

export default Register;
