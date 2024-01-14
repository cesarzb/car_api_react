import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateCar.css";
import { useTranslation } from "react-i18next";

const CreateCar = () => {
  const { t } = useTranslation();

  const [model, setModel] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [modelTouched, setModelTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [seatsTouched, setSeatsTouched] = useState(false);
  const [brandTouched, setBrandTouched] = useState(false);
  const [modelValid, setModelValid] = useState(false);
  const [seatsValid, setSeatsValid] = useState(false);
  const [priceValid, setPriceValid] = useState(false);
  const [brandValid, setBrandValid] = useState(true);
  const [carValid, setCarValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setModelValid(model.length > 0), [model]);
  useEffect(() => setSeatsValid(Number(seats) > 0), [seats]);
  useEffect(() => setPriceValid(Number(price) > 0), [price]);
  useEffect(() => setBrandValid(true), [brand]);
  useEffect(
    () => setCarValid(modelValid && seatsValid && priceValid),
    [price, model, seats]
  );

  const modelChange = (e) => {
    setModel(e.target.value);
    setModelTouched(true);
  };
  const seatsChange = (e) => {
    setSeats(e.target.value);
    setSeatsTouched(true);
  };
  const priceChange = (e) => {
    setPrice(e.target.value);
    setPriceTouched(true);
  };
  const brandChange = (e) => {
    setBrand(e.target.value);
    setBrandTouched(true);
  };

  const handleSubmit = () => {
    if (carValid) {
      const carData = {
        car: {
          model,
          seats: Number(seats),
          price: Number(price),
          brand_name: brand,
        },
      };
      fetch(API_URL + API_VERSION + `/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json();
          } else {
            navigate("/cars", { replace: true });
          }
        })
        .then(() => {
          setBrandValid(false);
          setBrandTouched(false);
        });
    }
  };

  return (
    <main className="create-car-form">
      <div className="form-field">
        <label htmlFor="car-model" className="form-label">
          {t("Car model")}
        </label>
        {modelTouched && !modelValid && (
          <div className="error-message">{t("Car model must be present")}</div>
        )}
        <input
          id="car-model"
          className={
            !modelTouched || modelValid ? "form-input" : "form-input-invalid"
          }
          value={model}
          onChange={modelChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="car-brand" className="form-label">
          {t("Car brand")}
        </label>
        {!brandTouched && !brandValid && (
          <div className="error-message">{t("Car brand must exist")}</div>
        )}
        <input
          id="car-brand"
          className={brandValid ? "form-input" : "form-input-invalid"}
          value={brand}
          onChange={brandChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="car-price" className="form-label">
          {t("Car price")}
        </label>
        {priceTouched && !priceValid && (
          <div className="error-message">
            {t("Car price must be greater than 0")}
          </div>
        )}
        <input
          id="car-price"
          className={
            !priceTouched || priceValid ? "form-input" : "form-input-invalid"
          }
          value={price}
          onChange={priceChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="car-seats" className="form-label">
          {t("Car seats")}
        </label>
        {seatsTouched && !seatsValid && (
          <div className="error-message">
            {t("Car has to have at least 1 seat")}
          </div>
        )}
        <input
          id="car-seats"
          className={
            !seatsTouched || seatsValid ? "form-input" : "form-input-invalid"
          }
          value={seats}
          onChange={seatsChange}
        />
      </div>
      <button onClick={handleSubmit}>{t("Submit")}</button>
    </main>
  );
};
export default CreateCar;
