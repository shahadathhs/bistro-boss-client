import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const Main = () => {
  const location = useLocation();
  const isLoginRegister = location.pathname.includes('login') || location.pathname.includes('register')
  return (
    <div>
      {isLoginRegister || <Navbar />}
      <Outlet />
      {isLoginRegister || <Footer />}
    </div>
  );
};

export default Main;