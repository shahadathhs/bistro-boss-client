import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const Main = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes('login')
  return (
    <div>
      {isLogin || <Navbar />}
      <Outlet />
      {isLogin || <Footer />}
    </div>
  );
};

export default Main;