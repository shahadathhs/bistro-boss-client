/* eslint-disable react/prop-types */
const Item = ({item}) => {
  const { image, price, name, recipe } = item;

  return (
    <div className="mx-auto shadow-lg p-3 flex gap-3 m-2">
      <img src={image} className="w-[100px] h-[100px] rounded-r-full rounded-b-full"/>
      <div>
        <p className="text-xl font-semibold uppercase">{name}</p>
        <p className="text-gray-400">{recipe}</p>
      </div>
      <p className="text-yellow-400 font-bold">${price}</p>
    </div>
  );
};

export default Item;