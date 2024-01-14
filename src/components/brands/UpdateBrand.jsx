import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/UpdateBrand.css";
import { useTranslation } from "react-i18next";

const UpdateBrand = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const [yearValid, setYearValid] = useState(false);
  const [brandValid, setBrandValid] = useState(false);

  useEffect(() => setNameValid(name.length > 0), [name]);
  useEffect(() => setYearValid(Number(year) > 0), [year]);
  useEffect(() => setBrandValid(nameValid && yearValid), [name, year]);

  const nameChange = (e) => {
    setName(e.target.value);
    setNameTouched(true);
  };

  const yearChange = (e) => {
    setYear(e.target.value);
    setYearTouched(true);
  };

  const navigate = useNavigate();
  const { brandId } = useParams();
  const { auth } = useAuth();
  const handleSubmit = () => {
    if (brandValid) {
      const brandData = {
        brand: {
          name,
          year,
        },
      };

      fetch(API_URL + API_VERSION + `/brands/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.accessToken,
        },
        body: JSON.stringify(brandData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json();
          } else {
            navigate("/brands", { replace: true });
          }
        })
        .then(() => {
          setNameValid(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setName(payload.name);
        setYear(payload.year);
      });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="create-brand-form">
      <div className="form-field">
        <label htmlFor="brand-name" className="form-label">
          {t("Brand name")}
        </label>
        {nameTouched && !nameValid && (
          <div className="error-message">{t("This brand name is invalid")}</div>
        )}
        <input
          id="brand-name"
          className="form-input"
          value={name}
          onChange={nameChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="brand-year" className="form-label">
          {t("Brand year")}
        </label>
        {yearTouched && !yearValid && (
          <div className="error-message">
            {t("Brand year must be greater than 0")}
          </div>
        )}
        <input
          id="brand-year"
          className="form-input"
          value={year}
          onChange={yearChange}
        />
      </div>
      <div className="link-group">
        <button onClick={handleSubmit}>{t("Submit")}</button>
        <Link to={`/brands/${brandId}`} className="form-link">
          {t("Back to brand")}
        </Link>
      </div>
    </main>
  );
};
export default UpdateBrand;
