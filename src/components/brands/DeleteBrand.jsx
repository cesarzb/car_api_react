import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";

const DeleteBrand = ({ brandId }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        API_URL + API_VERSION + `/brands/${brandId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigate("/brands", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="delete-team">
      <button className="delete-team-button" onClick={handleSubmit}>
        Delete brand
      </button>
    </div>
  );
};

export default DeleteBrand;
