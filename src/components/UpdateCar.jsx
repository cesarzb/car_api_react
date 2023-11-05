import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const [model, setModel] = useState("");
  const [seats, setSeats] = useState(5);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { carId } = useParams();

  const handleSubmit = () => {
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
      .then((response) => response.json())
      .then(() => {
        navigate("/cars", { replace: true });
      });
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
    <main className="create-team-form">
      <label htmlFor="car-model" className="team-description-label">
        Car model
      </label>
      <input
        id="car-model"
        className="team-description-input"
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
        }}
      ></input>
      <label htmlFor="car-brand" className="team-name-label">
        Car name
      </label>
      <input
        id="car-brand"
        className="team-name-input"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      ></input>
      <label htmlFor="car-seats" className="team-name-label">
        Car seats
      </label>
      <input
        id="car-seats"
        className="team-name-input"
        value={seats}
        onChange={(e) => {
          setSeats(e.target.value);
        }}
      ></input>
      <label htmlFor="car-price" className="team-name-label">
        Car price
      </label>
      <input
        id="car-price"
        className="team-name-input"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
      <Link to={`/cars/${carId}`} className="team-link">
        Back to car
      </Link>
    </main>
  );
};
export default UpdateCar;
