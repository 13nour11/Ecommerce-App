import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CardContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BeatLoader } from 'react-spinners';


export default function Cart() {
    const [cardDetails, setCardDetails] = useState(null);
    console.log(`Card Details: ${cardDetails}`);

    const [isLoading, setisLoading] = useState(false)

    // let {getLoggedUserCart} = useContext(CardContext);

    let {getLoggedUserCart , updateCartItemCount , deleteProductItem , clearUserCart , setcartId , cartId } = useContext(CartContext);
    // clearUserCart

    async function getCardItems(){
      setisLoading(true)
      let response = await getLoggedUserCart();
      console.log(response.data.data);

      setCardDetails(response.data.data);
      setisLoading(false);
    }

    // ========================================
    // updateProductCount
    async function updateProductCount(productId , count){
      let response = await updateCartItemCount(productId , count);
      console.log(response);
      setCardDetails(response.data.data)

    }
    // ========================================
    // deleteProductItem
    async function deleteItem(productId ){
      let response = await deleteProductItem(productId );
      console.log(response);
      setCardDetails(response.data.data)
    }

    // ========================================
    // clearUserCart
    async function clearCart(){
      let response = await clearUserCart();
      console.log(response);
      setCardDetails(response.data.data)
    }

    useEffect(()=>{
      getCardItems();
    },[]);

    useEffect(()=>{
      if(cartId){
        console.log("card id: "+cartId);
      }else{console.log("card id: "+'undefined');}
    },[cartId])

  return <>
  <Helmet>
    <title>
      FreshCart - Cart
    </title>
  </Helmet>

<div className="relative overflow-x-auto  sm:rounded-lg">
  <h2 className='text-center text-green-500 py-4 text-4xl '>Shopping Now </h2>
  <h3 className='text-center text-slate-600 text-lg mb-5' >Total Cart Price: {cardDetails?.totalCartPrice}</h3>

  {/* {`/checkout/${cardDetails?._id}`} */}
  <Link to={`/addresses`} onClick={()=>{setcartId(cardDetails?._id);console.log(`card id after click : ${cartId}`);}} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg  text-slate-600 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
    <span className="text-lg relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-slate-600 rounded-md group-hover:bg-opacity-0">
    Check Out
    </span>
  </Link>

{isLoading?
  <div className='py-8 w-full flex justify-center'>
      <BeatLoader color="green" />
  </div>:<>
  {cardDetails?.products && cardDetails.products.length>0?
  <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-16 py-3">
        <span className="sr-only">Image</span>
      </th>
      <th scope="col" className="px-6 py-3">
        Product
      </th>
      <th scope="col" className="px-6 py-3">
        Qty
      </th>
      <th scope="col" className="px-6 py-3">
        Price
      </th>
      <th scope="col" className="px-6 py-3">
        Action
      </th>
    </tr>
  </thead>
  <tbody>
    {cardDetails?.products.map((product)=>
      <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button onClick={()=>{ product.count === 1 ? deleteItem(product.product.id): updateProductCount(product.product.id , product.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <div>
            <span>{product.count}</span>
          </div>
          <button onClick={()=>updateProductCount(product.product.id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <span>{product.price}</span>
      </td>
      <td className="px-6 py-4">
        <span onClick={()=>deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
      </td>
    </tr>
    )}
    
  </tbody>
</table>
:
<div id="alert-border-5" className="my-10 flex flex-col items-center w-1/2 mx-auto p-4 rounded border-b-4 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600" role="alert">

<div className="ms-3 text-3xl  font-medium text-gray-600 dark:text-gray-300">
  There is no products 
</div>
</div>
  }
  
  
  
  </>
  
  
}
  
  <button onClick={()=>clearCart()} type="button" className="text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-600">
    Clear Your Cart
  </button>
  
</div>


  </>
}
