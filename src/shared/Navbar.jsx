import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks =
    <>
      <li>
        <NavLink to="/" 
        className={({ isActive }) => isActive
        ?"btn btn-outline text-white btn-sm mr-2"
        :"btn btn-outline text-white btn-sm border-0 mr-2"}
        >Home</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad" 
        className={({ isActive }) => isActive
        ?"btn btn-outline text-white btn-sm mr-2"
        :"btn btn-outline text-white btn-sm border-0 mr-2"}
        >Order</NavLink>
      </li>
      <li>
        <NavLink to="/menu" 
        className={({ isActive }) => isActive
        ?"btn btn-outline text-white btn-sm mr-2"
        :"btn btn-outline text-white btn-sm border-0 mr-2"}
        >Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/menu" 
        className={({ isActive }) => isActive
        ?"btn btn-outline text-white btn-sm mr-2"
        :"btn btn-outline text-white btn-sm border-0 mr-2"}
        >Our Menu</NavLink>
      </li>
    </>

  return (
    <nav className="navbar text-white bg-black bg-opacity-40 max-w-screen-xl fixed z-10 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        {/* <a className="btn">Button</a> */}
      </div>
    </nav>
  );
};

export default Navbar;