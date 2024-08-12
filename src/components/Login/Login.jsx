// import React, { useEffect, useState } from 'react'
// import Style from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  let {setuserLogin} =  useContext(UserContext);

  let validationSchema= Yup.object().shape({
    // objectForAllProperties:schema
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase').required('password is required'),
  })

    
    let navigate = useNavigate();
    // async function handleLogin(formValues){
    //   console.log(formValues);
    //   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValues)
    //   console.log(data);
    //   if(data.message === 'success'){
    //     // programatic navigate
    //     navigate('/')
    //   }
    //   else{
    //     // errorr
    //   }
    // }

    function handleLogin(formValues){
      setIsLoading(true);
        console.log(formValues);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValues)
        .then((apiResponse)=>{
          if(apiResponse.data.message === "success"){
            setIsLoading(false);
          
            setuserLogin(apiResponse.data.token);

            localStorage.setItem('userToken',apiResponse.data.token);

            navigate('/')
          }
          console.log(apiResponse);
          
        })
        .catch((apiResponse)=>{
          // console.log(apiResponse.response.data.message);
          setApiError(apiResponse?.response?.data?.message);
        })
        
    }

    let formik = useFormik({
      initialValues:{
        email:'',
        password:''
      },
      // validate: myValidation,
      validationSchema:validationSchema, // validationSchema only as the key and value same name
      onSubmit: handleLogin
    })

  return <>
  <div className="py-6 max-w-xl mx-auto">
    {apiError? 
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
      </div>: null
    }
    <h2 className='font-bold text-3xl mb-6 text-green-600'>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
        

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>:null}


        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>:null}

        

        <div className="flex items-center mt-6">
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Login'}
          </button>
          <p className='pl-6'>didn't have account yet? <span className='font-semibold'><Link to={'/register'}>Register Now</Link></span></p>
        </div>
        
        <Link to={'/forget-password'}  className='my-6 text-red-600 font-medium text-xl cursor-pointer hover:text-green-600'>Forgot your password?</Link>

    </form>
</div>

  </>
}
