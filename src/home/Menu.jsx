//import { useState } from "react";
//import { useEffect } from "react";
import Item from "../shared/Item";
import { Link } from "react-router-dom";
import useMenu from "../hooks/useMenu";

const Menu = () => {
  // const [menu, setMenu] = useState([])

  // useEffect( () => {
  //   fetch('menu.json')
  //   .then(res => res.json())
  //   .then(data => {
  //     const popularMenu = data.filter(item => item.category === 'popular')
  //     setMenu(popularMenu)
  //   })
  // },[])
  const [menu] = useMenu();
  const popularMenu = menu.filter(item => item.category === 'popular')

  return (
    <div>
      {/* banner */}
      <div className="text-center p-4 space-y-3">
        <p className="text-yellow-400 text-xl">---Check it out---</p>
        <hr className="w-[300px] mx-auto border-t-2" />
        <p className="text-2xl">FROM OUR MENU</p>
        <hr className="w-[300px] mx-auto border-t-2" />
      </div>
      {/* menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {
            popularMenu.map(item => <Item key={item._id} item={item}></Item>)
          }
      </div>
      <div className="text-center p-4"> <Link to='/menu' className="btn btn-outline">View Full Menu</Link> </div>
      <div className="text-3xl bg-black text-white h-[150px] flex justify-center items-center">
        <p>Call Us: +88 0192345678910</p>
      </div>
    </div>
  );
};

export default Menu;