import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../constants";

const DeleteCar = ({ carId }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL + API_VERSION + `/cars/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigate("/cars", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="delete-team">
      <button className="delete-team-button" onClick={handleSubmit}>
        Delete car
      </button>
    </div>
  );
};

export default DeleteCar;
