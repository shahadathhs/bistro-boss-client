import { Link } from 'react-router-dom';
import featured from '../assets/home/featured.jpg'

const Featured = () => {
  return (
    <div className="hero">
      <div
        className="hero bg-fixed h-full"
        style={{
          backgroundImage: `url(${featured})`,
          minHeight: '500px',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content">
        
      <div className='p-9'>
        {/* banner */}
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---Check it out---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">FROM OUR MENU</p>
          <hr className="w-[300px] mx-auto border-t-2" />
        </div>
        {/* featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center p-3">
          <img src={featured} />
          <div className='space-y-3'>
            <h1>March 20, 2023</h1>
            <p className='text-lg'>WHERE CAN I GET SOME?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, 
              deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium 
              tempore consequatur consequuntur omnis ullam maxime tenetur.
            </p>
            <Link className='btn btn-outline text-white border-0 border-b-4'>Read More</Link>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Featured;