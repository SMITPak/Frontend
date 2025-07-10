import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./layout";
import Home from "./Pages/Home/home";
import Shop from "./Pages/shop/shop";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
