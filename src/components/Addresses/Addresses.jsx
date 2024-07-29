import React, { useContext, useEffect, useState } from 'react'
import Style from './Addresses.module.css'
import { AddressesContext } from '../../Context/AddressesContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CardContext';
import * as Yup from 'yup';
export default function Addresses() {
  let {getLoggedUserAddresses , setaddressId ,addressId ,setPhoneId, phoneId,setCityId, cityId,removeAdress ,addAdress , getSpecificAddress} = useContext(AddressesContext);
  const [addressDetails, setaddressDetails] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [showForm, setshowForm] = useState(false);
  let {cartId} = useContext(CartContext)

  let validationSchema= Yup.object().shape({
    // objectForAllProperties:schema
    name: Yup.string().min(3, 'name minLength is 3').max(10, 'name maxLength is 10').required('name is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , 'phone must be egyption number').required('phone is required'),
    details: Yup.string().min(3, 'details minLength is 3').required('details is required'),
    city: Yup.string().min(3, " ").required('city is required')  
  });

  let formik = useFormik({initialValues:{
    // name , details , phone , city
    name:'',
    details:'',
    phone:'',
    city:'',
  },
  onSubmit:addUserAdress,
  validationSchema
});

  // Get Logged Address User
async function getLoggedAddressesUser() {
  setisLoading(true);
  try {
    let { data } = await getLoggedUserAddresses();
    console.log(data?.data);
    setaddressDetails(data?.data);
  } catch (error) {
    console.error(error);
  } finally {
    setisLoading(false);
  }
}

// Add Address
async function addUserAdress(formsValue) {
  let response = await addAdress(formsValue.name, formsValue.details, formsValue.phone, formsValue.city);
  console.log(response);
  setshowForm(false);
  getLoggedAddressesUser(); // Refresh the addresses after adding a new one
}

// Remove Address
async function removeUserAddress(addressId) {
  let response = await removeAdress(addressId);
  console.log(response.data);
  setaddressDetails(response.data.data);
  if (response.data.status === "success") {
    toast.success(response.data.message, {
      duration: 1000
    });
  } else {
    toast.error(response.data.message, {
      duration: 1000
    });
  }
}

// Get specific address
async function getSpecificUserAddress(addressId) {
  let response = await getSpecificAddress(addressId);
  console.log(response);
  setaddressId(response?.data.data.details);
  setCityId(response?.data.data.city);
  setPhoneId(response?.data.data.phone);
}

useEffect(() => {
  getLoggedAddressesUser();
}, []); // Empty dependency array ensures this runs only once on mount


    useEffect(()=>{
      console.log(addressId);
    },[addressId])

    useEffect(()=>{
      if(cartId){
        console.log(cartId);
      }
    },[cartId])

  return <>
  <Helmet>
    <title>
      User Addresses
    </title>
  </Helmet>

  {/* <div className="row"> */}
  {/* max-w-5xl bg-slate-50 */}
    <h1 className='p-4  text-4xl font-semibold mx-auto text-green-600'>User Address(es)  </h1>
    {addressDetails?.map((address ,index)=>
    // getSpecificUserAddress
    <div key={address._id} 
    onClick={()=>{
      getSpecificUserAddress(address._id);
      }}  
    className="p-4 userInfo text-lg text-start text-slate-500 border rounded-lg max-w-5xl mx-auto hover:bg-slate-50 hover:cursor-pointer my-5">
    <Link  to={`/checkout/${cartId}`}>
    <h1 className=' text-3xl font-normal mx-auto text-center text-green-600'>Your Address {index+1} </h1>
      <p className='p-3 text-xl  '>Your Name: <span className='mx-5 text-xl text-blue-500'>{address.name}</span></p>
      <p className="p-3 text-xl ">Your Details: <span className='mx-5 text-xl text-blue-500'>{address.details}</span></p>
      <p className="p-3 text-xl">Your Phone No: <span className='mx-5 text-xl text-blue-500'>{address.phone}</span></p>
      <p className="p-3 text-xl">Your City: <span className='mx-5 text-xl text-blue-500'>{address.city}</span></p>

      <button onClick={()=>{removeUserAddress(address?._id)}}  type="button" className="w-full my-5  text-red-600 hover:text-white border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-700 ">Remove </button>
  
    </Link>

    </div>

    )}
    {/* form */}
    <div className="py-6 max-w-lg mx-auto">

      <form onSubmit={formik.handleSubmit} className={`${showForm?'block':'hidden'}`}>
        {/* name */}
        <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name:</label>
          </div>
          {/* alert for error if there is*/}
          {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div>:null}

        {/* details */}
        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={addressId?addressId:formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.details && formik.touched.details?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.details}
        </div>:null}

  {/* phone */}
        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={phoneId?phoneId:formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number:</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>:null}

  {/* city */}
        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={cityId?cityId:formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
        </div>
        {/* alert for error if there is*/}
        {formik.errors.city && formik.touched.city?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.city}
        </div>:null} 

        <button  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {/* {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Ok'} */}
          Ok
        </button>

      </form>
    </div>
{/* <Link to={'check/'}></Link> */}
    <button onClick={()=>{
      setshowForm(true)
    }}   type="button" className="px-9 my-5  text-green-600 hover:text-white border border-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-700 ">Add Adress </button>

    

  </>
}
