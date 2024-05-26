import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from './../hooks/useAxiosPublic';
import useAxiosSecure from './../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item)
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    //console.log(data)
    const imageFile = { image: data.image[0]}
    //console.log(imageFile)
    // upload image to imgBB and get image url
    const res = await axiosPublic.post(imageHostingAPI, imageFile, {
      headers: {'content-Type': 'multipart/form-data' },
    })
    console.log(res.data)
    if (res.data.success) {
      // send form data to server with image url
      const menuItem = {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        recipe: data.recipe,
        image: res.data.data.display_url || item.image
      }
      console.log(menuItem)
      const  menuRes = await axiosSecure.patch(`/menu/${item._id}`, menuItem)
      console.log(menuRes.data)
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Menu has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    reset();
  }
  return (
    <div>
      <Helmet>
        <title>Update Menu | Bistro Boss</title>
      </Helmet>
      <div className="p-2 m-2 border-2 min-h-screen">
        {/* banner */}
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---Hurry Up---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">Update the Item</p>
          <hr className="w-[300px] mx-auto border-t-2" />
        </div>
        {/* update form */}
        <div className="bg-gray-100 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Menu Name:</span>
              </label>
              <input {...register("name", { required: true })}
              type="text" defaultValue={item.name}
              className="input input-bordered"/>
              {errors.name && <span className="text-red-600">Menu Name is required</span>}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Menu Price:</span>
              </label>
              <input {...register("price", { required: true })}
              type="number" defaultValue={item.price}
              className="input input-bordered"/>
              {errors.price && <span className="text-red-600">Menu Price is required</span>}
            </div>
            
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Menu Recipe:</span>
              </label>
              <textarea {...register("recipe", { required: true })}
              defaultValue={item.recipe}
              className="textarea textarea-bordered textarea-lg w-full" ></textarea>
              {errors.recipe && <span className="text-red-600">Menu Recipe is required</span>}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pick menu category:</span>
              </label>
              <select {...register("category", { required: true })}
              defaultValue={item.category}
              className="select select-success w-full">
                <option value="default">Select a category</option>
                <option value="offered">offered</option>
                <option value="dessert">dessert</option>
                <option value="pizza">pizza</option>
                <option value="salad">salad</option>
                <option value="soup">soup</option>
                <option value="drinks">drinks</option>
              </select>
              {errors.category && <span className="text-red-600">Menu category is required</span>}
            </div>
            
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick a file for menu image</span>
              </div>
              <input  {...register("image")}
              type="file" className="file-input file-input-bordered w-full" />
              {/* {errors.image && <span className="text-red-600">Menu image is required</span>} */}
            </label>
            <input type="submit" 
            className="btn btn-outline col-span-2 w-1/2 mx-auto" placeholder="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenu;