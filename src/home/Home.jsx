import Banner from "./Banner";
import Boss from "./Boss";
import Featured from "./Featured";
import Menu from "./Menu";
import Order from "./Order";
import Recommends from "./Recommends";
import Testimonials from "./Testimonials";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Bistro Boss</title>
      </Helmet>
      <div className="my-4 space-y-8">
        <Banner />
        <Order />
        <Boss />
        <Menu />
        <Recommends />
        <Featured />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;