import React, { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/BrandsList.css";
import { useTranslation } from "react-i18next";

const BrandsList = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1); // Initial page
  const navigate = useNavigate();

  const fetchBrands = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/brands?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setBrands(payload));
  };

  useEffect(() => {
    fetchBrands(page); // Initial fetch
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleBrandClick = (id) => {
    navigate(`/brands/${id}`);
  };

  return (
    <main className="brands-index">
      <Link className="button new-car-button" to="/brands/new">
        {t("Create a new brand")}
      </Link>
      {brands.length > 0 && (
        <div className="brands-list">
          {brands.map((brand) => (
            <div
              className="brand-item"
              key={brand.id}
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="brand-name">{brand.name}</div>
              <div className="brand-year">{brand.year}</div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {t("Previous")}
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={brands.length < 12}
        >
          {t("Next")}
        </button>
      </div>
    </main>
  );
};

export default BrandsList;
