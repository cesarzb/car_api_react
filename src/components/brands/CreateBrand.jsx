import { useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { useNavigate } from "react-router-dom";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(1234);

  const navigate = useNavigate();

  const handleSubmit = () => {
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
      },
      body: JSON.stringify(brandData),
    })
      .then((response) => response.json())
      .then((payload) => {
        navigate("/brands", { replace: true });
      });
  };

  return (
    <main className="create-team-form">
      <label htmlFor="team-name" className="team-name-label">
        Brand name
      </label>
      <input
        id="team-name"
        className="team-name-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label htmlFor="team-year" className="team-description-label">
        Brand year
      </label>
      <input
        id="team-year"
        className="team-description-input"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};
export default CreateBrand;
