import React, { useEffect, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[]);

    console.log(props);

    if(localStorage.getItem('userToken') !== null){
      return props.children;
      // console.log(props.children);
    }
    else{
      return <Navigate to={'/login'}/>;
      // console.log('hiii');
    }
  
}
