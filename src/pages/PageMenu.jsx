import { Helmet } from "react-helmet-async";
import banner from '../assets/menu/banner3.jpg';
import dessertbg from '../assets/menu/dessert-bg.jpeg';
import pizzabg from '../assets/menu/pizza-bg.jpg';
import saladbg from '../assets/menu/salad-bg.jpg';
import soupbg from '../assets/menu/soup-bg.jpg';
import Item from "../shared/Item";
import { Link } from "react-router-dom";
import useMenu from "../hooks/useMenu";
import Cover from "../shared/Cover";
//import { useEffect, useState } from "react";

const PageMenu = () => {
  // const [offered, setOffered] = useState([]);
  // const [dessert, setDessert] = useState([]);
  // const [pizza, setPizza] = useState([]);
  // const [salad, setSalad] = useState([]);
  // const [soup, setSoup] = useState([]);

  // useEffect( () => {
  //   fetch('menu.json')
  //   .then(res => res.json())
  //   .then(data => {
  //     const offeredMenu = data.filter(item => item.category === 'offered')
  //     setOffered(offeredMenu)
      
  //     const dessertMenu = data.filter(item => item.category === 'dessert')
  //     setDessert(dessertMenu)

  //     const pizzaMenu = data.filter(item => item.category === 'pizza')
  //     setPizza(pizzaMenu)

  //     const saladMenu = data.filter(item => item.category === 'salad')
  //     setSalad(saladMenu)

  //     const soupMenu = data.filter(item => item.category === 'soup')
  //     setSoup(soupMenu)
  //   })
  // },[])
  
  const [menu] = useMenu();
  const offeredMenu = menu.filter(item => item.category === 'offered')
  const dessertMenu = menu.filter(item => item.category === 'dessert')
  const pizzaMenu = menu.filter(item => item.category === 'pizza')
  const saladMenu = menu.filter(item => item.category === 'salad')
  const soupMenu = menu.filter(item => item.category === 'soup')

  return (
    <div>
      <Helmet>
        <title>Menu | Bistro Boss</title>
      </Helmet>
      <div className="my-4 space-y-4">
        {/* today offer */}
        <Cover img={banner} title="our menu"  des="Would you like to try a dish?"/>
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---Do not miss---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">OFFER FOR TODAY</p>
          <hr className="w-[300px] mx-auto border-t-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
             offeredMenu.map(item => <Item key={item._id} item={item}></Item>)
            }
        </div>
        <div className="text-center p-4"> 
          <Link to={`/order/${'offered'}`} className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</Link> 
        </div>
        
        {/* desserts */}
        <Cover img={dessertbg} title="DESSERTS"  des="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
              dessertMenu.map(item => <Item key={item._id} item={item}></Item>)
            }
        </div>
        <div className="text-center p-4"> 
          <Link to={`/order/${'dessert'}`} className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</Link> 
        </div>

        {/* pizza */}
        <Cover img={pizzabg} title="PIZZA"  des="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
              pizzaMenu.map(item => <Item key={item._id} item={item}></Item>)
            }
        </div>
        <div className="text-center p-4"> 
          <Link to={`/order/${'pizza'}`} className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</Link> 
        </div>

        {/* salad */}
        <Cover img={saladbg} title="SALADS"  des="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
              saladMenu.map(item => <Item key={item._id} item={item}></Item>)
            }
        </div>
        <div className="text-center p-4"> 
          <Link to={`/order/${'salad'}`} className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</Link> 
        </div>

        {/* soup */}
        <Cover img={soupbg} title="SOUPS"  des="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
              soupMenu.map(item => <Item key={item._id} item={item}></Item>)
            }
        </div>
        <div className="text-center p-4"> 
          <Link to={`/order/${'soup'}`} className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</Link> 
        </div>
      </div>
    </div>
  );
};

export default PageMenu;