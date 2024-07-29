import React, { useContext, useEffect, useState } from 'react'
import Style from './RecentProducts.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { BeatLoader } from 'react-spinners';
import useProducts from '../Hooks/useProducts'; // custom hook
import { CartContext } from '../../Context/CardContext';

import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';



export default function RecentProducts() {
    let {addProductToCart} = useContext(CartContext);

    let {addProductToWishList} = useContext(WishListContext);
    // const [heartColor, setheartColor] = useState(()=>{
    //   const savedColor = localStorage.getItem("heartColors");
    //   return savedColor?JSON.stringify(savedColor):{}
    // });


    const [loading, setLoading] = useState(false);
    const [currProductId, setCurrProductId] = useState(0);

    // const [recentProducts, setRecentProducts] = useState([]);

    // function getRecentProducts(){
    //   axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //   .then(({data})=>{
    //     setRecentProducts(data.data);

    //   })
    //   .catch((error)=>{
    //     console.log(error);
    //   })
    // }
    // // did mount
    // useEffect(()=>{
    //   getRecentProducts();
    // },[]);
// ========================================
    // react-query
    // function getRecentProducts(){
    //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    // }
    // let {data,isError,error,isLoading,isFetching} = useQuery({
    //   queryKey: ['recentProducts'],
    //   queryFn: getRecentProducts,

    //   // staleTime: 8000,

    //   // refetchInterval: 3000,

    //   // refetchIntervalInBackground: true,

    //   // retry: Infinity,

    //   // retryDelay:5000,

    //   // refetchOnWindowFocus:true,

    //   gcTime: 4000

    // })
    // console.log(info);

    let {data,isError,error,isLoading,isFetching} = useProducts(); // call custom hook

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

    // ========================================
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

    // ========================================
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

    return <>
    
    <div className="row gap-5">
      {data?.data.data.map((product)=> 
      // box-shadow: 1px 1px 10px #4fa74f;
        <div className='w-1/6 px-4  py-3 hover:shadow-[1px_1px_10px_#4fa74f] transition-all duration-500 cursor-pointer group' key={product.id} >
          <div className="product py-4 ">
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
          </Link>
          <div className=" flex justify-between items-center mb-3">

            <button onClick={()=>{addProduct(product.id)}} className="btn w-full bg-green-600 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100  transition-all duration-500">
              {currProductId == product.id && loading ?<i className="fas fa-spinner fa-spin"></i>:'+ Add To Cart.'}
            </button>

            <i onClick={()=>{addWishListProduct(product.id); }} 
            className={`fa-solid fa-heart fa-xl cursor-pointer `}></i>
            {/* className={`fa-solid fa-heart fa-xl cursor-pointer ${heartColor[product.id] ? 'text-red-500' : ''}`}></i> */}
          
          </div>
          </div>
        </div>
      
    )}
    </div>
    
    </>
}
