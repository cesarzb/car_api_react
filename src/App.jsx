import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import CarsList from "./components/CarsList";
import CarDetails from "./components/CarDetails";
import CreateCar from "./components/CreateCar";
import UpdateCar from "./components/UpdateCar";
import BrandDetails from "./components/brands/BrandDetails";
import BrandsList from "./components/brands/BrandsList";
import CreateBrand from "./components/brands/CreateBrand";
import UpdateBrand from "./components/brands/UpdateBrand";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/cars/:carId" element={<CarDetails />} />
        <Route path="/cars/new" element={<CreateCar />} />
        <Route path="/cars/:carId/edit" element={<UpdateCar />} />

        <Route path="/brands" element={<BrandsList />} />
        <Route path="/brands/:brandId" element={<BrandDetails />} />
        <Route path="/brands/new" element={<CreateBrand />} />
        <Route path="/brands/:brandId/edit" element={<UpdateBrand />} />
      </Route>
    </Routes>
  );
}

export default App;
