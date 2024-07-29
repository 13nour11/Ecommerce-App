import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CardContextProvider(props){

    const [cartId, setcartId] = useState(null);

    let headers;
    if(localStorage.getItem('userToken')){
        headers =  {
            token: localStorage.getItem('userToken')
        }
    }

    function getLoggedUserCart(){
        // axios.get("apiURL" , {configraton Object as 'headers'})
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    function addProductToCart(productId){
        // axios.post("apiURL" , {body} , {configraton Object as 'headers'})
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId:productId} ,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    function updateCartItemCount(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count:count} ,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    function deleteProductItem(productId ){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    function clearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    

    return <CartContext.Provider value={{getLoggedUserCart , addProductToCart , updateCartItemCount , deleteProductItem , clearUserCart ,setcartId,cartId}}>
        {props.children}
    </CartContext.Provider>
}