import { Outlet } from "react-router";
import { NavbarComponent } from "./Components/Navbars/navbar";

export default function Layout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}
