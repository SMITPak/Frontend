import { Outlet } from "react-router";
import { NavbarComponent } from "./Components/Navbars/navbar";
import ChatWidget from "./Components/Chat/chat";
import { useSelector } from "react-redux";

export default function Layout() {
  const { user } = useSelector((state) => state?.reducer?.auth);
  return (
    <>
      <NavbarComponent />
      <Outlet />
      {user && <ChatWidget />}
    </>
  );
}
