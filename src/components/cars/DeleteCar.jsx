import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import "../../styles/DeleteCar.css";
import { useTranslation } from "react-i18next";

const DeleteCar = ({ carId }) => {
  const { t } = useTranslation();

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
    <button className="delete-car-button" onClick={handleSubmit}>
      {t("Delete car")}
    </button>
  );
};

export default DeleteCar;
