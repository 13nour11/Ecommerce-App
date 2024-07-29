import React, {  useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CouterContext';
import { UserContext } from '../../Context/UserContext';


export default function Navbar() {
    // const [counter, setCounter] = useState(0);
    useEffect(()=>{},[]);

    // to use context
    let {userLogin,setuserLogin} = useContext(UserContext);

    // to programatic navigate
    let navigate = useNavigate();

    function logOut(){
      localStorage.removeItem('userToken');
      setuserLogin(null);
      navigate('/login');
    }

  return <>
  {/* note that: tailwindcss style for mobile first */}
  <nav className='bg-gray-100 lg:fixed top-0 left-0 right-0 z-50'>
    <div className="container mx-auto py-4 flex justify-between items-center">
      <div className="flex flex-col xl:flex-row text-center">
        <img src={logo} alt="fresh cart logo" width={120} />
        <ul className='flex flex-col xl:flex-row justify-around m-0 pl-10 items-center'>
          {userLogin !== null ? <>
            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/'}>Home</NavLink></li>
            {/* <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/about'}>About</NavLink></li> */}
            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/cart'}>Cart</NavLink></li>

            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/wishList'}>WishList</NavLink></li>

            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/categories'}>Categories</NavLink></li>
            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/brands'}>Brands</NavLink></li>
            <li className='text-center text-slate-900 font-normal me-3'><NavLink to={'/products'}>Products</NavLink></li>

          </> : null}
        </ul>
      </div>

      <ul className='flex flex-col xl:flex-row  justify-around m-0 pl-10 items-center'>
        {userLogin ===null?<>
          <li className='mx-4 text-md text-slate-900 font-normal'><NavLink to={'/login'}>Login</NavLink></li>
          <li className='mx-4 text-md text-slate-900 font-normal'><NavLink to={'/register'}>Register</NavLink></li>

          </> : 
          <li onClick={logOut} className='mx-4 text-md text-slate-900 font-normal'><span className='cursor-pointer'>Logout</span></li>
        }
        <li className='mx-4 text-md text-slate-900 font-normal flex justify-between items-center'>
          <i className='fab fa-facebook mx-2 fa-sm'></i>
          <i className='fab fa-twitter mx-2 fa-sm'></i>
          <i className='fab fa-instagram mx-2 fa-sm'></i>
          <i className='fab fa-tiktok mx-2 fa-sm'></i>
          <i className='fab fa-youtube mx-2 fa-sm'></i>
        </li>
        
      </ul>
      
      
    </div>
  </nav>
  </>
}
