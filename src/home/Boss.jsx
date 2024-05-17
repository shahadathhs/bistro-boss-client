import chef from "../assets/home/chef-service.jpg";

const Boss = () => {
  return (
    <div className="hero">
      <img src={chef} />
      <div className="hero-content text-center bg-white text-black">
        <div className="max-w-lg p-4">
          <h1 className="mb-5 text-5xl font-bold uppercase">Bistro Boss</h1>
          <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, 
          libero accusamus laborum deserunt ratione dolor officiis praesentium! 
          Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Boss;