import React, { useContext, useEffect, useState } from 'react';
import Style from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CardContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AddressesContext } from '../../Context/AddressesContext';

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  let { cartId } = useParams();
  // console.log(cartId);

  let validationSchema = Yup.object().shape({
    // objectForAllProperties:schema
    details: Yup.string().min(3, 'details minLength is 3').required('details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone is invalid').required('phone is required'),
    city: Yup.string().min(3, 'city minLength is 3').required('city is required'),
  });

  let { setuserLogin } = useContext(UserContext);

  let { addressId, cityId, phoneId } = useContext(AddressesContext);

  useEffect(() => {
    // if(addressId){  console.log(`addess id ${addressId}`); }else{console.log('address id not defined');}
  }, [addressId]);

  async function checkOut(address) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}/`,
        { shippingAddress: address },
        {
          params: { url: 'http://localhost:5173' },
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );

      setIsLoading(false);

      // console.log(response.data.session.url);

      window.location.href = response.data.session.url;
    } catch (error) {
      setIsLoading(false);
      setApiError('An error occurred while processing the payment.');
    }
  }

  function handleRegister(formsValue) {
    setIsLoading(true);
    console.log(formsValue);

    const address = {
      details: addressId ? addressId : formsValue.details,
      phone: phoneId ? phoneId : formsValue.phone,
      city: cityId ? cityId : formsValue.city,
    };
    checkOut(address);
  }

  let formik = useFormik({
    initialValues: {
      details: addressId ? addressId : '',
      phone: phoneId ? phoneId : '',
      city: cityId ? cityId : '',
    },
    validationSchema: validationSchema, // validationSchema only as the key and value same name
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="py-6 max-w-5xl mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>
          {/* alert for error if there is*/}
          {formik.errors.details && formik.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.details}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number:
            </label>
          </div>
          {/* alert for error if there is*/}
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>
          {/* alert for error if there is*/}
          {formik.errors.city && formik.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.city}
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Pay Now'}
          </button>
        </form>
      </div>
    </>
  );
}
