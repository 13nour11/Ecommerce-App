import React, { useEffect, useState } from 'react'
// import Style from './Notfound.module.css'
import notfound from '../../assets/images/notfound.PNG';
// import { Link } from 'react-router-dom';
export default function Notfound() {
    // const [counter, setCounter] = useState(0);
    useEffect(()=>{},[]);
  return <>
    <div className=" flex flex-col  text-slate-600 ">
        <div className="flex items-center justify-center ">
            <h1 className='text-[15rem] font-semibold   '>
              4 
              
            </h1>
            <div className="image  ">
                <img src={notfound} alt="" className='block w-fit' />
              </div>
              <h1 className='text-[15rem] font-semibold '>
              4 
              
            </h1>
        </div>
        <h2 className='text-5xl font-semibold'>Oh No!</h2>
        <p className='text-3xl mt-4'>Page Not Found</p>
      
    </div>
    </>
}
