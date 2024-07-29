
import axios from 'axios';
import React, { createContext, useState } from 'react'

export let CategoriesContext = createContext();

export default function CategoriesContextProvider(props) {
    const [subCatName, setSubCatName] = useState("");
    const [subCategoriesOnCategory, setsubCategoriesOnCategory] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    // Get All Categories
    function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((response)=>response)
        .catch((error)=>error);
    }

    // Get specific category
    function getSpecificCategory(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then((response)=>response)
        .catch((error)=>error);
    }

    return<>
    <CategoriesContext.Provider value={{getAllCategories , getSpecificCategory, subCategoriesOnCategory,setsubCategoriesOnCategory,subCatName, setSubCatName, isLoading, setisLoading}}>
        {props.children}
    </CategoriesContext.Provider>
    </>
}
