import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover";
import banner from '../assets/shop/banner2.jpg'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from './../hooks/useMenu';
import { Link, useParams } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Order = () => {
  const categories = [ 'offered', 'dessert', 'pizza', 'salad', 'soup', 'drinks']
  const {category} = useParams();
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex)

  const [menu] = useMenu();
  const offeredMenu = menu.filter(item => item.category === 'offered')
  const dessertMenu = menu.filter(item => item.category === 'dessert')
  const pizzaMenu = menu.filter(item => item.category === 'pizza')
  const saladMenu = menu.filter(item => item.category === 'salad')
  const soupMenu = menu.filter(item => item.category === 'soup')
  const drinksMenu = menu.filter(item => item.category === 'drinks')

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = (addedItem) => {
    const cartItem = {
      oldId : addedItem._id,
      ownerEmail : user.email,
      name : addedItem.name,
      prize : addedItem.price,
      image : addedItem.image,
      category : addedItem.category,
      recipe : addedItem.recipe
    }
    console.table(cartItem)
    axiosSecure.post('/carts', cartItem)
    .then(res => {

      console.log(res.data)
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${addedItem.name} added to your Cart`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>Shop | Bistro Boss</title>
      </Helmet>
      <div className="my-4 space-y-4">
        <Cover img={banner} title="OUR SHOP"  des="Would you like to try a dish?"/>

        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Offered</Tab>
            <Tab>Dessert</Tab>
            <Tab>Pizza</Tab>
            <Tab>Salad</Tab>
            <Tab>Soup</Tab>
            <Tab>Drinks</Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                offeredMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                        <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                dessertMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                      <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                pizzaMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                      <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                saladMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                      <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                soupMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                      <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                drinksMenu.map(item =>
                  <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">{item.name}!</h2>
                      <p>{item.recipe}.</p>
                      <div className="card-actions justify-center">
                      <Link onClick={() => handleAddToCart(item)}
                        className="btn btn-primary">Add to Cart</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;