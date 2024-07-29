// import React, { useEffect, useState } from 'react'
// import Style from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useContext, useState } from 'react';
import  { UserContext } from '../../Context/UserContext';


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // 
  let {setuserLogin} = useContext(UserContext);

  let validationSchema= Yup.object().shape({
    // objectForAllProperties:schema
    name: Yup.string().min(3, 'name minLength is 3').max(10, 'name maxLength is 10').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , 'phone must be egyption number').required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')] , 'password and repassword must be same').required('phone is required'),
  })

    // function myValidation(formValues){
    //   let errors = {};
    //   if(!formValues.name){
    //     errors.name = 'Name is Required';
    //   }
    //   else if(!/^[A-Z][a-z]{3,5}$/.test(formValues.name)){
    //     errors.name = "Name must start with uppercase then "
    //   }

    //   if(!formValues.email){
    //     errors.email='Email is Required';
    //   }
    //   else if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formValues.email)    ){
    //     errors.email= 'Email is invalid'
    //   }
    //   return errors;
    // }

    let navigate = useNavigate();
    // async function handleRegister(formValues){
    //   console.log(formValues);
    //   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
    //   console.log(data);
    //   if(data.message === 'success'){
    //     // setIsLoading(false);
    //     // programatic navigate
    //     navigate('/')
    //   }
    //   else{
    //     // errorr
    //   }
    // }


    function handleRegister(formValues){
      setIsLoading(true);
        console.log(formValues);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
        .then((apiResponse)=>{
          if(apiResponse.data.message === "success"){
            setIsLoading(false);
            setuserLogin(apiResponse.data.token);
            localStorage.setItem('userToken',apiResponse.data.token)
            navigate('/');
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
        name:'',
        email:'',
        phone:'',
        password:'',
        rePassword:''
      },
      // validate: myValidation,
      validationSchema:validationSchema, // validationSchema only as the key and value same name
      onSubmit: handleRegister
    })

  return <>
  <div className="py-6 max-w-xl mx-auto">
    {apiError?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
    </div>
    :null
    }
        

    <h2 className='font-bold text-3xl mb-6 text-green-600'>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div>:null}

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>:null}

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>:null} 

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>:null}

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Your Password:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
        </div>:null}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Submit'}
        </button>
    </form>
</div>

  </>
}
