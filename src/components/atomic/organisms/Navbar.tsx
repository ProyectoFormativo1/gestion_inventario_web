import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import logo from "../../../assets/images/logo.png";
import React from "react";
import { MenuItem } from "../atoms/MenuItem";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/Routes";
import Logo from "../atoms/logo/Logo";

interface NavbarAppProps {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  isAuthenticated?: boolean;
  email?: string;
  fullName?: string;
  menuItems?: Array<MenuItem>;
  onLogOut?: () => void;
}

const NavbarApp = ({
  leftContent,
  centerContent,
  isAuthenticated,
  fullName,
  email,
  menuItems,
  onLogOut,
}: NavbarAppProps) => {
  const NAME_APP = import.meta.env.VITE_NAME_APP;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };


  return (
    <Navbar
      className="bg-gradient-to-r from-purple-900  to-blue-600"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarBrand>
        <Logo highlight={false} onClick={() => navigate(routes.home)  } />
       {/*  <p className="font-bold text-white">{NAME_APP}</p> */}
      </NavbarBrand>
      {leftContent && (
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          {leftContent}
        </NavbarContent>
      )}
      {centerContent && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {centerContent}
        </NavbarContent>
      )}

      {isAuthenticated && (
        <NavbarContent justify="end">
          <h2 className="hidden sm:block text-white">{fullName}</h2>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={fullName}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-normal">Haz iniciadp sesion como</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={onLogOut}>
                Salir
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
       <NavbarMenu>
        {menuItems?.map((menu, index) => (
          <NavbarMenuItem key={`${menu.code}-${index}`}>
            <Link
              className="w-full"
              color="foreground" 
              onPress={() => handleMenuItemClick(menu.path)}
              size="lg"
            >
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarApp;
