import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import AllCustomers from "./Pages/AllCustomers";
import AllProducts from "./Pages/AllProducts";
import AllOrders from "./Pages/AllOrders";
import AdminProfile from "./Pages/AdminProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Layout from "./components/User/Layout";
import Home from "./Pages/Home";
import ProductPageWithGallery from "./Pages/ProductDetail";
import AddToCart from "./Pages/AddToCart";
import LoginPage from "./authentication/Login";
import RegisterPage from "./authentication/RegisterPage";
import Myorders from "./Pages/Myorders";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminProtected from "./share/AdminProtected";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/admindashboard" element={<AdminProtected compo={AdminLayout} />}>
          <Route index element={<AdminProtected compo={AdminDashboard} />} />
          <Route path="customers" element={<AllCustomers />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="orders" element={<AllOrders />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductPageWithGallery />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/myorders" element={<Myorders />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
