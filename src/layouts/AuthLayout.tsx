import { Outlet } from "react-router-dom";
import logo from '../assets/images/logo.jpg';
import Logo from "../components/atomic/atoms/logo/Logo";

const AuthLayout = () => {
  return (
    <div
      className="h-screen"
    >
      <div className="fondo flex flex-col md:flex-row h-full bg-white bg-opacity-80">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 mt-8">
          <img src={logo} alt="Slide" className="object-cover mb-4" />
          <Logo />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
