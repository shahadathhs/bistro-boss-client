// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect } from 'react';
import { useState } from 'react';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Testimonials = () => {
  const [reviews, setReviews] = useState([])

  useEffect( ()=> {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`)
    .then(res => res.json())
    .then(data => setReviews(data))
  },[])

  return (
    <div>
      {/* banner */}
      <div className="text-center p-4 space-y-3">
        <p className="text-yellow-400 text-xl">---What Our Clients Say---</p>
        <hr className="w-[300px] mx-auto border-t-2" />
        <p className="text-2xl">TESTIMONIALS</p>
        <hr className="w-[300px] mx-auto border-t-2" />
      </div>
      {/* testimonials */}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
          reviews.map(review => 
            <SwiperSlide key={review._id}>
              <div className='max-w-md text-center mx-auto space-y-3'>
                <Rating
                  className='mx-auto'
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <p>{review.details} </p>
                <h1 className='text-xl text-yellow-500'>{review.name} </h1>
              </div>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  );
};

export default Testimonials;