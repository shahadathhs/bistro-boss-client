import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recommends = () => {
  const [recommends, setRecommends] = useState([])
  
  useEffect( () => {
    fetch('menu.json')
    .then(res => res.json())
    .then(data => {
      const offeredMenu = data.filter(item => item.category === 'offered')
      setRecommends(offeredMenu)
    })
  },[])
  return (
    <div>
      {/* banner */}
      <div className="text-center p-4 space-y-3">
        <p className="text-yellow-400 text-xl">---Should Try---</p>
        <hr className="w-[300px] mx-auto border-t-2" />
        <p className="text-2xl">CHEF RECOMMENDS</p>
        <hr className="w-[300px] mx-auto border-t-2" />
      </div>
      {/* recommends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
        {
          recommends.map(recommend =>
            <div key={recommend._id} className="card bg-base-100 shadow-xl">
              <figure><img src={recommend.image} alt="Shoes" /></figure>
              <div className="card-body text-center">
                <h2 className="card-title justify-center">{recommend.name}!</h2>
                <p>{recommend.recipe}.</p>
                <div className="card-actions justify-center">
                  <Link className="btn btn-primary">Add to Cart</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Recommends;