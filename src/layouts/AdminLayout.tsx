import { Outlet } from "react-router-dom";
import NavbarApp from "../components/atomic/organisms/Navbar";
import Sidebar from "../components/atomic/organisms/Sidebar";
import { useAuth } from "../hooks/use-auth";
import { adminMenu } from "./Menu";
const AdminLayout = () => {
  const { isAuthenticated, user, onLogout } = useAuth();
  return (
    <>
      <NavbarApp
        menuItems={ adminMenu}
        isAuthenticated={isAuthenticated}
        email={user?.email}
        fullName={user?.fullName}
        onLogOut={onLogout}
      />

      <div className="flex">
        <Sidebar menuItems={adminMenu} />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
