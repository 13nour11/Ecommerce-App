import React, { useContext, useEffect, useId, useState } from 'react'
import Style from './AllOrders.module.css'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
    let {userId} = useContext(UserContext);
    console.log(userId)

    const [orderDetails, setallOrderDetails] = useState(null);

    // getAllOrders
    async function getAllOrders(){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
      console.log(data?.data);
      setallOrderDetails(data?.data);
    }
    // getUserOrders
    async function getUserOrders(userId){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      console.log(data);
      setallOrderDetails(data?.data);
    }

    useEffect(()=>{
      if(useId !== null){
        getUserOrders(userId);
      }
      // getAllOrders()
      // getUserOrders(userId);


    },[]);//userId

  return <>
  <Helmet>
    <title>
        Orders
    </title>
  </Helmet>
  
  <div className="relative overflow-x-auto  sm:rounded-lg">
  <h2 className='text-center text-green-500 py-4 text-4xl '>Your Orders </h2>
  <div className="row">
  {/* {orderDetails?.map((order)=><div className='w-1/4' key={order?.id}>

  </div>)} */}
  {orderDetails && orderDetails.length>0 ?
  <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-16 py-3">
        <span > Name</span>
      </th>
      <th scope="col" className="px-16 py-3">
        <span >Image</span>
      </th>
      <th scope="col" className="px-6 py-3">
        Product
      </th>
      <th scope="col" className="px-6 py-3">
       Qth 
      </th>
      <th scope="col" className="px-6 py-3">
      Total Price
      </th>
    </tr>
  </thead>
  <tbody>
    {orderDetails?.map((detail)=>(
      // console.log(detail?.user.name)
      detail.cartItems.map((order)=>(
        <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {detail?.user?.name}
          </td>
          <td className="p-4">
            <img src={order?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={order?.product?.title} />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {order?.product?.title}
          </td>
          
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            <span>{order?.count}</span>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            <span>{detail?.totalOrderPrice}</span>
          </td>
      
        </tr>
      )))
    )}
    
  </tbody>
</table> 
:
<div id="alert-border-5" className="flex flex-col items-center w-1/2 mx-auto p-4 rounded border-b-4 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600" role="alert">

<div className="ms-3 text-3xl  font-medium text-gray-600 dark:text-gray-300">
  There is no orders 
</div>
</div>
  }

  </div>

  
  
  
</div>
  
  </>
}
