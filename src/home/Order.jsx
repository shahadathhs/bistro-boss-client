// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// import images
import s1 from "../assets//home/slide1.jpg";
import s2 from "../assets//home/slide2.jpg";
import s3 from "../assets//home/slide3.jpg";
import s4 from "../assets//home/slide4.jpg";
import s5 from "../assets//home/slide5.jpg";


const Order = () => {
  return (
    <div>
      {/* banner */}
      <div className="text-center p-4 space-y-3">
        <p className="text-yellow-400 text-xl">---From 11:00am to 10:00pm---</p>
        <hr className="w-[300px] mx-auto border-t-2" />
        <p className="text-2xl">ORDER ONLINE</p>
        <hr className="w-[300px] mx-auto border-t-2" />
      </div>
      {/* slider */}
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide className='text-center text-lg bg-white flex justify-center items-center'>
          <img src={s1}/>
          <h3 className='text-2xl text-center uppercase -mt-20 pb-4 text-white'>salads</h3>
        </SwiperSlide>
        <SwiperSlide className='text-center text-lg bg-white flex justify-center items-center'>
          <img src={s2}/>
          <h3 className='text-2xl text-center uppercase -mt-20 text-white'>pizzas</h3>
        </SwiperSlide>
        <SwiperSlide className='text-center text-lg bg-white flex justify-center items-center'>
          <img src={s3}/>
          <h3 className='text-2xl text-center uppercase -mt-20 text-white'>soups</h3>
        </SwiperSlide>
        <SwiperSlide className='text-center text-lg bg-white flex justify-center items-center'>
          <img src={s4}/>
          <h3 className='text-2xl text-center uppercase -mt-20 text-white'>cakes</h3>
        </SwiperSlide>
        <SwiperSlide className='text-center text-lg bg-white flex justify-center items-center'>
          <img src={s5}/>
          <h3 className='text-2xl text-center uppercase -mt-20 text-white'>desserts</h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Order;