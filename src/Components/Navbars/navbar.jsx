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
import { useDispatch, useSelector } from "react-redux";
import { AuthModal } from "../Modal/auth";
import { logout } from "../../Redux/authSlice";

export function NavbarComponent() {
  const { value } = useSelector((e) => e.count);
  const { user } = useSelector((state) => state?.reducer?.auth);
  const dispatch = useDispatch();
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
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex flex-wrap gap-2">
                <Avatar
                  placeholderInitials={(user?.name).slice(0, 2)}
                  rounded
                />
              </div>
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </DropdownHeader>
            <DropdownItem><NavLink to={'/order'}>Your Orders</NavLink></DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => dispatch(logout())}>
              Sign out
            </DropdownItem>
          </Dropdown>
        ) : (
          <AuthModal />
        )}

        {/*  */}
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
