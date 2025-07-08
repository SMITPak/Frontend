import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./layout";
import Home from "./Pages/Home/home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
