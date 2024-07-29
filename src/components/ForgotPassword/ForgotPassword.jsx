import React, { useEffect, useState } from 'react'
import Style from './ForgotPassword.module.css'
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);

    let validationSchema = Yup.object().shape({
      email:Yup.string().email('email is invalid').required('email is required')
    });
    let navigate = useNavigate();


    async function handleForgotPassword(formValues){
      setisLoading(true);

      // console.log(formValues);
      let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
        "email": formValues.email
      })
      if(response.data.statusMsg === "success"){
        setisLoading(false);
        toast.success(response.data.message ,{duration:1000});
        navigate('/verify-code')
        
      }else{
        toast.error(response.data.message ,{duration:1000});

      }
      console.log(response);
    }

    let formik = useFormik({
      initialValues:{
        email:''
      },
      validationSchema,
      onSubmit: handleForgotPassword
    })
    // 
    
    useEffect(()=>{},[]);
  return <>
  <Helmet>
    <title>
      Forgot Password
    </title>
  </Helmet>
  {/* <div className="py-6 max-w-xl mx-auto"> */}
  <h2 className='text-start my-8 text-3xl font-semibold'>Please enter your verification code</h2>

  <form onSubmit={formik.handleSubmit}>
        

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>:null}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            
            {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Verify'}
          </button>

  </form>
  {/* </div> */}
  </>
}
