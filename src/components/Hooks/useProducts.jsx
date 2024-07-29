// hook like a component but it is not actually a react component as hooks must start with 'use' + HookName , 
// and react component must start with capital
// ===============================================

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
    function getRecentProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let responseObject = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecentProducts,

    // staleTime: 8000,
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true,
    // retry: Infinity,
    // retryDelay:5000,
    // refetchOnWindowFocus:true,
    // gcTime: 4000
    });
    return responseObject;
}
