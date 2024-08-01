import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CardContext';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let {id,category} = useParams();
  const [productDetails, setProductDetails] = useState(null); // will be object
  const [relatedProducts, setRelatedProducts] = useState([]); 
  let {addProductToCart} = useContext(CartContext);

  let {addProductToWishList} = useContext(WishListContext);
  const [currProductId, setCurrProductId] = useState(0);


  const [isLoading, setIsLoading] = useState(false);

  // slick settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var settings2 = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true
  };

  function getProductDetails(id){
    setIsLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setProductDetails(data.data);
      // console.log(data.data);

      setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error);

      setIsLoading(false);
    })
  }

  function getRelatedProducts(category){
    // setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`) // will get all 40 products
    .then(({data})=>{
      let allProducts = data.data;
      let related = allProducts.filter((product)=>product.category.name ==  category);
      setRelatedProducts(related);

      // setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      // setIsLoading(false);

    })
  }

  // addProductToCart

  async function addProduct(productId){
    // setIsLoading(true)
    let response = await addProductToCart(productId);
    console.log(response);

    // setIsLoading(false);

    setCurrProductId(productId);

    if(response.data.status  === "success"){
      // setIsLoading(false);
      toast.success(response.data.message ,{
        duration: 1000,
        position: 'bottom-left'
      });
    }
    else{
      setIsLoading(false);
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

  // component did update run at did mount and when update id or category will run and work after component did mount as return
  useEffect(()=>{
    getProductDetails(id);
    getRelatedProducts(category);
  },[id,category]);

  return <>
  <Helmet>
    <title>Product Detals</title>
  </Helmet>
  {/* to show ProductDetails */}
  {isLoading?
    <div className='py-8 w-full flex justify-center'>
      <BeatLoader color="green" />
    </div>
  :
  <div className="row">
    <div className="w-1/4 ">
    <Slider {...settings}>
      {productDetails?.images.map((src,index)=><img key={index} src={src} alt={productDetails?.title} className='w-full ' /> )}

    </Slider>
    {/* <Slider {...settings}>
      {productDetails?.images.map((src, index) => (<img key={index} src={src} alt={productDetails?.title} className="w-full" />
    ))}
    </Slider> */}
    </div>
    <div className="w-3/4 p-6 text-start">
      <h1 className='text-4xl font-semibold text-gray-950 '>{productDetails?.title}</h1>
      <p className='text-gray-600 mt-4 mb-5'>{productDetails?.description}</p>
      <div className="flex justify-between items-center mb-3 ">
            <span>{productDetails?.price} EGP</span>
            <span>
              <i className='fas fa-star text-yellow-500'></i>
              {productDetails?.ratingsAverage}
            </span>
          </div>
          <div className="flex justify-center items-center">
          <button className="btn mt-3 w-2/3 bg-green-500" onClick={()=>{addProduct(productDetails?.id)}}>+ Add To Cart.</button>
          </div>
          
    </div>
  </div>
  }

  {/* to show RelatedProducts */}
  <div className="row">
    {relatedProducts.map((product)=> 
    // <Slider {...settings2} >

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
              {currProductId == product.id && isLoading ?<i className="fas fa-spinner fa-spin"></i>:'+ Add To Cart.'}
            </button>

            <i onClick={()=>{addWishListProduct(product.id); }} 
            className={`fa-solid fa-heart fa-xl cursor-pointer `}></i>
            {/* className={`fa-solid fa-heart fa-xl cursor-pointer ${heartColor[product.id] ? 'text-red-500' : ''}`}></i> */}
          
          </div>
        </Link>
        </div>
    </div>
    // </Slider>
    )}
  </div>
  </>
}
