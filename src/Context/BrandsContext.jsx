import axios from 'axios';
import React, { createContext } from 'react'

export let BrandsContext = createContext();

export default function BrandsContextProvider(props) {
    // Get All Brands
    function getAllBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then((response)=>response)
        .catch((error)=>error)
    }

    return <>
    <BrandsContext.Provider value={{getAllBrands}}>
        {props.children}
    </BrandsContext.Provider>
    </>
}
