import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./layout";
import Home from "./Pages/home/page";
import Shop from "./Pages/shop/page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addCart } from "./Redux/countCart";
import Cart from "./Pages/cart/page";

function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(addCart())
  }, [])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
