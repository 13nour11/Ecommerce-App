import React, { useContext, useEffect, useState } from 'react'
import Style from './Categories.module.css'
import useProducts from '../Hooks/useProducts'; // custom hook
import { CategoriesContext } from '../../Context/CategoriesContext';
import { Helmet } from 'react-helmet';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Categories() {
    let {getAllCategories, subCategoriesOnCategory,setsubCategoriesOnCategory, subCatName, setSubCatName, isLoading, setisLoading} = useContext(CategoriesContext);

    const [categoriesDetails, setCategoriesDetails] = useState(null);
    // const [currId, setCurrId] = useState(0);

    let navigate = useNavigate();

    // let resposeObject = useProducts(); // call custom hook
    // {data,isError,error,isLoading,isFetching}
    // resposeObject

    // console.log(resposeObject);
    // console.log(data);

    async function getCategories(){
      setisLoading(true);
      let response = await getAllCategories();
      console.log(response.data.data);
      setCategoriesDetails(response.data.data);
      setisLoading(false);
    }

    // // i donot know how can i run this or when
    // async function getSpecificCategoryy(id){
    //   let response = await getSpecificCategory(id);
    //   console.log(response.data.data);
    //   setCurrId(id);
    //   // setCategoriesDetails(response.data.data)
    // }
    

    // {{BaseUrl}}/api/v1/categories/6407ea3d5bbc6e43516931df/subcategories
    // Get All SubCategories On Category
    async function GetAllSubCategoriesOnCategory(id){
      setisLoading(true)
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      console.log('all subcategories on cat. :..');
      console.log(response.data.data);
      setsubCategoriesOnCategory(response.data.data);
      navigate('/subcat');
      setisLoading(false);
      
    }
    

    useEffect(()=>{
      getCategories();
      
    },[]); //categoriesDetails

  
  return <>
  <Helmet>
    <title>
      Categories
    </title>
  </Helmet>

  <h1 className="text-green-500 text-5xl font-semibold py-4">All Categories</h1>
{isLoading?
  <div className='py-8 w-full flex justify-center'>
      <BeatLoader color="green" />
  </div>
  :<>
  <div className="row">
    {categoriesDetails?.map((category)=>
    <div className="w-1/3 px-4  py-3" key={category._id} >
      <div className="inner border border-slate-400  rounded-md" onClick={()=>{GetAllSubCategoriesOnCategory(`${category._id}`); setSubCatName(category.name)}}>
          <img src={category.image} alt={category.name} className='w-full category-image2'/>
          <h3 className='text-green-700 text-3xl font-semibold p-4'>{category.name}</h3>
      </div>
      
    </div>

    )}

    

  </div>

  </>
}
  
</>
  
}
