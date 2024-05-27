import axios from "axios";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     axiosSecure.interceptors.response.use(res => {
    //         return res;
    //     }, error => {
    //         console.log('error tracked in the interceptor', error.response)
    //         if (error.response.status === 401 || error.response.status === 403) {
    //             console.log('logout the user')
    //             logOut()
    //                 .then(() => { 
    //                     navigate('/login')
    //                 })
    //                 .catch(error => console.log(error))
    //         }
    //     })
    // }, [logOut, navigate])

    // request interceptor to authorization for every single secure call 
    axiosSecure.interceptors.request.use(function (config) {
      // Do something before request is sent
      const localToken = localStorage.getItem("access-token")
      //console.log("request stopped by interceptor", localToken)
      config.headers.authorization = `Bearer ${localToken}`
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    //response interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error)
      const status = error.response.status
      //console.log('error tracked in the interceptor', error.response , status)
            if (status === 401 || status === 403) {
                console.log('logout the user')
                logOut()
                    .then(() => { 
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
      return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;