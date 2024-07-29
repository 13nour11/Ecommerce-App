import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CardContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

export default function Products() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[]);

    let {addProductToCart} = useContext(CartContext);

    let {addProductToWishList} = useContext(WishListContext);

    const [loading, setLoading] = useState(false);

    const [currProductId, setCurrProductId] = useState(0);

    function getRecentProducts(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    // addProductToCart
    async function addProduct(productId){
      let response = await addProductToCart(productId);
      console.log(response);

      setLoading(true);

      setCurrProductId(productId);

      if(response.data.status  === "success"){
        setLoading(false);
        toast.success(response.data.message ,{
          duration: 1000,
          position: 'bottom-left'
        });
      }
      else{
        setLoading(false);
        toast.error(response.data.message ,{
          duration: 1000,
          position: 'bottom-left'
        });
      }

    }

    // addProductToWishList
    async function addWishListProduct(productId){
      let response = await addProductToWishList(productId);
      console.log("wishlist function "+response.data.data);

      // setCurrProductId(productId);
      // setheartColor('text-red-600');
    

      if(response.data.status  === "success"){
        // setLoading(false);
        toast.success(response.data.message ,{
          duration: 1000,
          position: 'bottom-left'
        });
        // setheartColor(prevState => ({ ...prevState, [productId]: true }));

      }
      else{
        // setLoading(false);
        toast.error(response.data.message ,{
          duration: 1000,
          position: 'bottom-left'
        });
      }

    }

    let {data,isError,error,isLoading,isFetching} = useQuery({
      queryKey: ['recentProducts'],
      queryFn: getRecentProducts,

      staleTime: 8000,

      refetchInterval: 3000,

      refetchIntervalInBackground: true,

      // retry: Infinity,

      // retryDelay:5000,
    })
    // console.log(info);

    if(isLoading){
      return <div className='py-8 w-full flex justify-center'>
        <BeatLoader color="green" />
      </div>
    }

    if(isError){
      return <div className='py-8 w-full flex justify-center'>
        <h3>        {error}     </h3>
      </div>
    }
  
    return <>
    <Helmet>
      <title>
        Products
      </title>
    </Helmet>
    
    <h1 className="text-green-500 text-5xl font-semibold py-4">All Products</h1>

    <div className="row gap-5">
      {data?.data.data.map((product)=> 
      
      <div className='w-1/6 px-4  py-3 hover:shadow-[1px_1px_10px_#4fa74f] transition-all duration-500 cursor-pointer group' key={product.id} >
          <div className="product py-4">
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.title} className='w-full' />
            <span className='block mt-2 text-green-600 font-light'>{product.category.name}</span>
            <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
            <div className="flex justify-between items-center mb-3">
              <span>{product.price} EGP</span>
              <span>
                <i className='fas fa-star text-yellow-500'></i>
                {product.ratingsAverage}
              </span>
            </div>
            <div className=" flex justify-between items-center mb-3">

            <button onClick={()=>{addProduct(product.id)}} className="btn w-full bg-green-600 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100  transition-all duration-500">
              {currProductId == product.id && loading ?<i className="fas fa-spinner fa-spin"></i>:'+ Add To Cart.'}
            </button>

            <i onClick={()=>{addWishListProduct(product.id); }} 
            className={`fa-solid fa-heart fa-xl cursor-pointer `}></i>
            {/* className={`fa-solid fa-heart fa-xl cursor-pointer ${heartColor[product.id] ? 'text-red-500' : ''}`}></i> */}
          
          </div>
          </Link>
          </div>
        </div>
      
    )}
    </div>
    </>
}
