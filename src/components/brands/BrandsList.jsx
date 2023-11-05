import React, { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import { Link } from "react-router-dom";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1); // Initial page

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

  return (
    <main className="brands-list">
      <Link to="/brands/new">Create a new brand</Link>
      {brands.length > 0 ? (
        <>
          {brands.map((brand) => (
            <div className="team-item" key={brand.id}>
              <div className="team-name">{brand.name}</div>
              <div className="team-name">{brand.year}</div>
              <Link to={`/brands/${brand.id}`} className="brand-link">
                Show brand
              </Link>
            </div>
          ))}
          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      ) : (
        <>
          <div>No brands to show :(</div>
          {page != 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          )}
        </>
      )}
    </main>
  );
};

export default BrandsList;
