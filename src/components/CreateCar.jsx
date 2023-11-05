import { useState } from "react";
import { API_URL, API_VERSION } from "../constants";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
  const [model, setModel] = useState("");
  const [seats, setSeats] = useState(5);
  const [price, setPrice] = useState(10);
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
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
      .then((response) => response.json())
      .then((payload) => {
        console.log("payload");
        console.log(payload);
        navigate("/cars", { replace: true });
      });
  };

  return (
    <main className="create-team-form">
      <label htmlFor="team-model" className="team-name-label">
        Car model
      </label>
      <input
        id="team-model"
        className="team-name-input"
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
        }}
      ></input>
      <label htmlFor="team-brand" className="team-description-label">
        Car brand
      </label>
      <input
        id="team-brand"
        className="car-description-input"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      ></input>
      <label htmlFor="team-price" className="team-description-label">
        Car price
      </label>
      <input
        id="team-price"
        className="car-description-input"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <label htmlFor="team-seats" className="team-description-label">
        Car seats
      </label>
      <input
        id="team-seats"
        className="car-description-input"
        value={seats}
        onChange={(e) => {
          setSeats(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};
export default CreateCar;
