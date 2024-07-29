import React, { useEffect, useState } from 'react'
// import Style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {
    const [categories, setCategories] = useState([]);

    var settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 8,
      slidesToScroll: 3,
      autoplay:true,
    };
    
    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`) // will get all categories
      .then(({data})=>{
        setCategories(data.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    useEffect(()=>{
      getCategories();
    },[]);

  return <>
  <div className="py-5">
    <h2 className='py-4 text-gray-800 font-medium text-xl text-start'>Show Popular Categories</h2>
  <Slider {...settings}>
    {categories.map((category,index)=><div key={index}>
      <img src={category.image} alt={category.name} className='w-full category-image' />
      <h3 className='font-normal mt-2'>{category.name}</h3>
    </div>)}
  </Slider>
  </div>
  </>
}
