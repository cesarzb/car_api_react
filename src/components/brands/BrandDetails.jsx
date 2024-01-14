import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteBrand from "./DeleteBrand";
import useAuth from "../../hooks/useAuth";
import "../../styles/BrandDetails.css";
import { useTranslation } from "react-i18next";

const BrandDetails = () => {
  const { auth } = useAuth();
  const [brand, setBrand] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { brandId } = useParams();
  const { t } = useTranslation();

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
    <main className="brand-details-card">
      <div className="brand-details-card-top">
        <div className="brand-details-name">{brand.name}</div>
        <div className="brand-details-year">{brand.year}</div>
      </div>
      <div className="brand-details-links">
        <Link to={`/brands`} className="brand-details-link button">
          {t("Back to brands list")}
        </Link>
        <Link
          to={`/brands/${brand.id}/edit`}
          className="car-details-link button"
        >
          {t("Edit brand")}
        </Link>
        <DeleteBrand brandId={brandId} className="button" />
      </div>
    </main>
  );
};

export default BrandDetails;
