import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import CarsList from "./components/cars/CarsList";
import CarDetails from "./components/cars/CarDetails";
import CreateCar from "./components/cars/CreateCar";
import UpdateCar from "./components/cars/UpdateCar";
import BrandDetails from "./components/brands/BrandDetails";
import BrandsList from "./components/brands/BrandsList";
import CreateBrand from "./components/brands/CreateBrand";
import UpdateBrand from "./components/brands/UpdateBrand";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Register from "./components/Register";
import "./i18n";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/cars/:carId" element={<CarDetails />} />
        <Route path="/cars/new" element={<CreateCar />} />
        <Route path="/cars/:carId/edit" element={<UpdateCar />} />

        <Route element={<RequireAuth />}>
          <Route path="/brands" element={<BrandsList />} />
          <Route path="/brands/:brandId" element={<BrandDetails />} />
          <Route path="/brands/new" element={<CreateBrand />} />
          <Route path="/brands/:brandId/edit" element={<UpdateBrand />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
