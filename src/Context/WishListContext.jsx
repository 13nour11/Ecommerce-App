import axios from 'axios';
import React, { createContext } from 'react'

export let WishListContext = createContext();

export default function WishListContextProvider(props) {

    // 
    let headers;
    if(localStorage.getItem('userToken')){
        headers = {
            token: localStorage.getItem('userToken')
        }
    }
    // console.log(headers);

    // ============================================
    // Get logged user wishlist
    function getLoggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    // ============================================
    // Add product to wishlist
    function addProductToWishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    // ============================================
    // Remove product from wishlist
    function removeProductFromWishList(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    return <>
    <WishListContext.Provider value={{getLoggedUserWishList , addProductToWishList , removeProductFromWishList}}>
        {props.children}
    </WishListContext.Provider>

    </>
}
