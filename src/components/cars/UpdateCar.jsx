import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/UpdateCar.css";
import { useTranslation } from "react-i18next";

const UpdateCar = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { carId } = useParams();

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

      fetch(API_URL + API_VERSION + `/cars/${carId}`, {
        method: "PUT",
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

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setModel(payload.model);
        setSeats(payload.seats);
        setBrand(payload.brand.name);
        setPrice(payload.price);
      });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
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
          className="form-input"
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
          className="form-input"
          value={brand}
          onChange={brandChange}
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
          className="form-input"
          value={seats}
          onChange={seatsChange}
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
          className="form-input"
          value={price}
          onChange={priceChange}
        />
      </div>
      <div className="link-group">
        <button onClick={handleSubmit}>{t("Submit")}</button>
        <Link to={`/cars/${carId}`} className="car-link">
          {t("Back to car")}
        </Link>
      </div>
    </main>
  );
};
export default UpdateCar;
