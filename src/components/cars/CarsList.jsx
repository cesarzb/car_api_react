import React, { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CarsList.css";
import { useTranslation } from "react-i18next";

const CarsList = () => {
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1); // Initial page

  const navigate = useNavigate();

  const fetchCars = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/cars?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setCars(payload));
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCarClick = (id) => {
    navigate(`/cars/${id}`);
  };

  return (
    <div className="cars-index">
      <Link className="button new-car-button" to="/cars/new">
        {t("Create a new car")}
      </Link>
      {cars.length > 0 && (
        <div className="cars-list">
          {cars.map((car) => (
            <div
              className="car-item"
              key={car.id}
              onClick={() => handleCarClick(car.id)}
            >
              <div className="car-model">{car.model}</div>
              <div className="car-brand">{car.brand.name}</div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {t("Previous")}
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={cars.length < 12}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default CarsList;
