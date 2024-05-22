import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { login, googleLogin } = useAuth();
  const [disabled, setDisabled] = useState(true);

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state  || "/";

  // handle social login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user)
        if (result.user) {
          navigate(from);
          const name = result.user.displayName;
          const email = result.user.email;
          
          const userInfo = { name, email}        
          // create user in database
          axiosPublic.post("/users", userInfo)
          .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
              Swal.fire({
                title: 'Successful!',
                text: 'You Login Successful',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
            }
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Login UnsuccessFul!',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
        console.log(error);
      })
  };
  
  useEffect(()=> {
    loadCaptchaEnginge(6); 
  },[])

  const handleCaptcha = (e) => {
    e.preventDefault()
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false)
      Swal.fire({
        title: 'Successful!',
        text: 'Captcha Matched',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    }
    else {
      setDisabled(true)
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Captcha did not match!',
      //   icon: 'error',
      //   confirmButtonText: 'Try Again'
      // })
    }
  }

  const handleLogin = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginUser = {email, password};
    console.table(loginUser)

    login(email, password)
      .then((result) => {
        console.log(result.user)
        Swal.fire({
          title: 'Successful!',
          text: 'You Login Successful',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        if (result.user) {
          navigate(from);
        } 
      })
      .catch((error)=> {
        Swal.fire({
          title: 'Error!',
          text: 'Password or Email did not match!',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
        console.log(error)
      })
  }

  return (
    <HelmetProvider>
      <Helmet>
        Login | Bistro Boss
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content grid grid-cols-1 md:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          {/* form */}
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin}
            className="card-body">
              {/* register link */}
              <p className="text-sm text-center dark:text-gray-400">
                  Do not have account? Register
                  <Link to="/register" className="ml-2 focus:underline hover:underline text-indigo-600">here</Link>
                </p>
                {/* google login */}
                <div className="my-6 space-y-4 p-4">
                  <button aria-label="Login with Google"  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:dark:ring-indigo-400">
                    Login with Google
                  </button>
                </div>

                <div className="flex items-center w-full my-4">
                  <hr  className="w-full dark:text-gray-400" />
                  <p className="px-3 dark:text-gray-400">OR</p>
                  <hr  className="w-full dark:text-gray-400" />
                </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={handleCaptcha} type="text" name="captcha" placeholder="Type the Captcha" className="input input-bordered" required />
                {/* <button className='btn btn-outline btn-xs mt-2'>Check</button> */}
              </div>
              
              <div className="form-control mt-6">
                <input disabled={disabled} type="submit" value="Login" className="btn btn-outline" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </HelmetProvider>
    // <div className="hero min-h-screen bg-base-200">
    //   <div className="hero-content grid grid-cols-1 md:grid-cols-2">
    //     <div className="text-center lg:text-left">
    //       <h1 className="text-5xl font-bold">Login now!</h1>
    //       <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    //     </div>
    //     {/* form */}
    //     <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    //       <form onSubmit={handleLogin}
    //       className="card-body">
    //         {/* register link */}
    //         <p className="text-sm text-center dark:text-gray-400">
    //             Do not have account? Register
    //             <Link to="/register" className="ml-2 focus:underline hover:underline text-indigo-600">here</Link>
    //           </p>
    //           {/* google login */}
    //           <div className="my-6 space-y-4 p-4">
    //             <button aria-label="Login with Google"  onClick={handleGoogleLogin}
    //             className="flex items-center justify-center gap-2 w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:dark:ring-indigo-400">
    //               Login with Google
    //             </button>
    //           </div>

    //           <div className="flex items-center w-full my-4">
    //             <hr  className="w-full dark:text-gray-400" />
    //             <p className="px-3 dark:text-gray-400">OR</p>
    //             <hr  className="w-full dark:text-gray-400" />
    //           </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Email</span>
    //           </label>
    //           <input type="email" name="email" placeholder="email" className="input input-bordered" required />
    //         </div>
            
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Password</span>
    //           </label>
    //           <input type="password" name="password" placeholder="password" className="input input-bordered" required />
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //           <LoadCanvasTemplate />
    //           </label>
    //           <input onBlur={handleCaptcha} type="text" name="captcha" placeholder="Type the Captcha" className="input input-bordered" required />
    //           {/* <button className='btn btn-outline btn-xs mt-2'>Check</button> */}
    //         </div>
            
    //         <div className="form-control mt-6">
    //           <input disabled={disabled} type="submit" value="Login" className="btn btn-outline" />
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;