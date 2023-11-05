import React, { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../constants";
import { Link } from "react-router-dom";

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1); // Initial page

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

  return (
    <main className="cars-list">
      <Link to="/cars/new">Create a new car</Link>
      {cars.length > 0 ? (
        <>
          {cars.map((car) => (
            <div className="team-item" key={car.id}>
              <div className="team-name">{car.model}</div>
              <div className="team-description">{car.brand.name}</div>
              <div className="team-name">{car.seats}</div>
              <div className="team-name">{car.price}$</div>
              <Link to={`/cars/${car.id}`} className="car-link">
                Show car
              </Link>
            </div>
          ))}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      ) : (
        <>
          <div>No cars to show :(</div>
          {page != 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          )}
        </>
      )}
    </main>
  );
};

export default CarsList;
