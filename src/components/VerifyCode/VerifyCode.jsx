import React, { useEffect, useState } from 'react'
import Style from './VerifyCode.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
    useEffect(()=>{},[]);

    const [isLoading, setIsLoading] = useState(false);

    // let validationSchema = Yup.string().matches(``,"your code is invalid");
    let validationSchema = Yup.object().shape({
      code: Yup.string().required('your code is required')
  });

    let navigate = useNavigate();

    function handleVerificationCode(formValues){
      setIsLoading(true);
      // console.log(formValues);
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{"resetCode":`${formValues.code}`})
      .then( ({data})=>{
        if( data.status === "Success"){
        setIsLoading(false)
        navigate('/reset-password')
      }
      console.log(data);
      }
      )
      .catch(()=>formik.setErrors({ code: 'your code is invalid' }))
      
    }

    let formik= useFormik({
      initialValues:{
        code:""
      },
    
    validationSchema,
    onSubmit:handleVerificationCode
    }
  );
  return <>
  <Helmet>
    <title>Verify-Vode</title>
  </Helmet>

  <h2 className='text-start my-8 text-3xl font-semibold'> Reset your account password</h2>

  <form onSubmit={formik.handleSubmit}>
        

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.code} type="text" name="code" id="code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="code" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.code?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.code}
        </div>:null}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Verify'}
        </button>

  </form>


    </>
}
