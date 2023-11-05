import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateBrand = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { brandId } = useParams();

  const handleSubmit = () => {
    const brandData = {
      brand: {
        name,
        year,
      },
    };

    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/brands", { replace: true });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setName(payload.name);
        setYear(payload.seats);
      });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="create-team-form">
      <label htmlFor="brand-name" className="team-description-label">
        Brand name
      </label>
      <input
        id="brand-name"
        className="team-description-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label htmlFor="brand-year" className="team-name-label">
        Brand year
      </label>
      <input
        id="brand-year"
        className="team-name-input"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
      <Link to={`/brands/${brandId}`} className="team-link">
        Back to brand
      </Link>
    </main>
  );
};
export default UpdateBrand;
