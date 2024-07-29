import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../../Context/CouterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
    // const [counter, setCounter] = useState(0);

    // use context
    // let {counter,setCounter} = useContext(CounterContext);

    useEffect(()=>{},[]);

  return <>
  <Helmet>
    <title>
      FreshCart
    </title>
  </Helmet>
  
  <MainSlider/>
  
  <CategoriesSlider/>

  <RecentProducts/>



  {/* <div className='py-10'>
  <h2 className=' bg-lime-200'>Home  <span className='p-4'>{counter}</span></h2>
  <button className='btn bg-gray-700 p-5 rounded text-white my-5' onClick={()=>setCounter(Math.random)}>Change Counter</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ullam explicabo sint eligendi earum quidem, a nisi beatae quas cumque, error suscipit. Aliquid, recusandae. Eveniet, culpa? Ut cumque perspiciatis similique!</p>

  </div> */}
    </>
}
