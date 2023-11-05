import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../constants";
import DeleteCar from "./DeleteCar";

const CarDetails = () => {
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
    <main className="team-details">
      <div className="team-details-item team-item" key={car.id}>
        <div className="team-details-description team-description">
          Model: {car.model}
        </div>
        <div className="team-details-description team-description">
          Seats: {car.seats}
        </div>
        <div className="team-details-description team-description">
          Brand: {car?.brand?.name}
        </div>
        <div className="team-details-description team-description">
          Price: {car.price}$
        </div>
      </div>
      <Link to={`/cars/${car.id}/edit`} className="team-edit-link">
        Edit car
      </Link>
      <DeleteCar carId={carId} />
      <Link to={`/cars`} className="teams-link">
        Back to cars list
      </Link>
    </main>
  );
};

export default CarDetails;
