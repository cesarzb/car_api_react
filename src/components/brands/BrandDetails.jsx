import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteBrand from "./DeleteBrand";
import useAuth from "../../hooks/useAuth";

const BrandDetails = () => {
  const { auth } = useAuth();
  const [brand, setBrand] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { brandId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setBrand(payload);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="team-details">
      <div className="team-details-item team-item" key={brand.id}>
        <div className="team-details-description team-description">
          Name: {brand.name}
        </div>
        <div className="team-details-description team-description">
          Year: {brand.year}
        </div>
      </div>
      <Link to={`/brands/${brand.id}/edit`} className="team-edit-link">
        Edit brand
      </Link>
      <DeleteBrand brandId={brandId} />
      <Link to={`/brands`} className="teams-link">
        Back to brands list
      </Link>
    </main>
  );
};

export default BrandDetails;
