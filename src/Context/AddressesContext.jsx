import axios from 'axios';
import React, { createContext, useState } from 'react'

export let AddressesContext = createContext();
export default function AddressesContextProvider(props) {

    const [addressId, setaddressId] = useState(null);

    const [phoneId, setPhoneId] = useState(null)
    const [cityId, setCityId] = useState(null)

    let headers;
    if(localStorage.getItem('userToken')){
        headers =  {
            token: localStorage.getItem('userToken')
        }
    }

    // Get logged user addresses
    function getLoggedUserAddresses(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    // Get specific address
    function getSpecificAddress(addressId){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    // Add address
    function addAdress(name , details , phone , city){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, {name:name , details:details , phone:phone , city:city},{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }
    
    // remove address
    function removeAdress(addressId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    return <>
    <AddressesContext.Provider value={{getLoggedUserAddresses , getSpecificAddress , setaddressId , addressId , addAdress , removeAdress , phoneId,setPhoneId,cityId,setCityId}}>
        {props.children}
    </AddressesContext.Provider>
    </>
}
