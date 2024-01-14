import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteCar from "./DeleteCar";
import "../../styles/CarDetails.css";
import { useTranslation } from "react-i18next";

const CarDetails = () => {
  const { t } = useTranslation();

  const [car, setCar] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { carId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setCar(payload);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="car-details-card">
      <div className="car-details-card-top">
        <div className="car-details-model">{car.model}</div>
        <div className="car-details-brand">{car?.brand?.name}</div>
      </div>
      <div className="car-details-card-bottom">
        <div className="car-details-boring-info">
          <div className="car-details-seats">
            {car.seats} {t("seats")}
          </div>
          <div className="car-details-price">
            {t("Price:")} {Number(car.price).toFixed(2)}$
          </div>
        </div>
        <div className="car-details-links">
          <Link to={`/cars`} className="car-details-link button">
            {t("Back to cars list")}
          </Link>
          <Link to={`/cars/${car.id}/edit`} className="car-details-link button">
            {t("Edit car")}
          </Link>
          <DeleteCar carId={carId} className="button" />
        </div>
      </div>
    </main>
  );
};

export default CarDetails;
