import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./layout";
import Home from "./Pages/home/page";
import Shop from "./Pages/shop/page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addCart } from "./Redux/countCart";
import Cart from "./Pages/cart/page";
import ChatWidget from "./Pages/Admin/dashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCart());
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/admin" element={<ChatWidget />} />
    </Routes>
  );
}

export default App;
