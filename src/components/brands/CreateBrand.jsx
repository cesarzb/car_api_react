import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const CreateBrand = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const [yearValid, setYearValid] = useState(false);
  const [brandValid, setBrandValid] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (brandValid) {
      const brandData = {
        brand: {
          name,
          year,
        },
      };
      fetch(API_URL + API_VERSION + `/brands`, {
        method: "POST",
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

  return (
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
      <button onClick={handleSubmit}>{t("Submit")}</button>
    </main>
  );
};
export default CreateBrand;
