import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Navigation from "./presentation/components/navigation";
import AdminHomePage from "./presentation/pages/admin/pages/admin-home-page";
import LoginPage from "./presentation/pages/shop/login-page";
import HomePage from "./presentation/pages/shop/home-page";
import RegisterPage from "./presentation/pages/shop/register-page";
import { useEffect } from "react";
import { fetchUserDirectly } from "./domain/store/actions/getUserOwn";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./domain/usecases/store/rootState";
import CategoriesPage from "./presentation/pages/admin/pages/content/categories";
import PartnersPage from "./presentation/pages/admin/pages/content/partners-page";
import ProductPage from "./presentation/pages/admin/pages/content/product-page";
import ProductDetails from "./presentation/pages/shop/products-page/product-details";
import CartPage from "./presentation/pages/shop/cart-page";
import ProductsByCategory from "./presentation/pages/shop/products-page/products-by-category";
import UserProfilePage from "./presentation/pages/shop/user-profile-page";

const App = () => {

  const username = useSelector((state: IRootState) => state.user?.username);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchUserDirectly(dispatch);
  }, [dispatch]);
  const redirectPath = searchParams.get('redirect') || '/';

  const renderRegisterPage = username ? <Navigate to="/" /> : <RegisterPage />;
  const renderLoginPage = username ? <Navigate to={redirectPath} /> : <LoginPage />;

  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={renderLoginPage} />
        <Route path="/register" element={renderRegisterPage} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/products/:category" element={<ProductsByCategory />} />

        <Route path="/admin" element={<AdminHomePage />}>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="product" element={<ProductPage />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;