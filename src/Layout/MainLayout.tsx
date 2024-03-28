import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/navbar";
import Footer from "../components/Shared/Footer/footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
