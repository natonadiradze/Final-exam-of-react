import React, { lazy, Suspense } from 'react';
import Layout from "./components/Layout/Layout.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home.jsx";
import Loader from "./components/Loader.jsx";
const NotFound = lazy(() => import('./views/NotFound.jsx'))
const Products = lazy(() => import("./views/Products.jsx"))
const Product = lazy(() => import("./views/Product.jsx"))
const ProductList = lazy(() => import("./views/ProductList.jsx"))
const Favorite = lazy(() => import("./views/Favorite.jsx"))
const CartItems = lazy(() => import("./components/cartItems.jsx"))
const Login = lazy(() => import("./components/Login.jsx"))
const App = () => {
    return (
        <Router>
            <Layout>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path={'/'} element={<Home />} />
                        <Route path="/category/:categoryName" element={<Products />} />
                        <Route path={"/products/:id"} element={<Product />} />
                        <Route path={"/allproduct"} element={<ProductList />} />
                        <Route path={"/cart"} element={<CartItems />} />
                        <Route path={"/favorites"} element={<Favorite />} />
                        <Route path={"/login"} element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
};

export default App;
