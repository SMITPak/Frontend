import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { NavLink } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { AuthModal } from "../Modal/auth";

export function NavbarComponent() {
  const { value } = useSelector((e) => e.count);
  return (
    <Navbar className="!bg-green-800">
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="https://saylani-welfare-uk.netlify.app/jhdjh.png"
          className="mr-3 rounded-full h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap font-semibold dark:text-white">
          Saylani Store
        </span>
      </NavbarBrand>
      <div className="flex items-center gap-2 md:order-2">
        <NavLink to={"/cart"} className="relative">
          <MdOutlineShoppingCart className="size-8 text-green-100 cursor-pointer " />
          {value > 0 && (
            <p className="absolute -top-2 right-0 bg-white rounded-full leading-none p-0.5">
              {value}
            </p>
          )}
        </NavLink>
        <AuthModal />
        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown> */}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-200" : "text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-green-200" : "text-white"
          }
        >
          Shop
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
}
