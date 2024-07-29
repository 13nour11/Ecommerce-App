import React, { useContext, useEffect, useState } from 'react'
import Style from './SubCategory.module.css'
import { CategoriesContext } from '../../Context/CategoriesContext';
import { Helmet } from 'react-helmet';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

export default function SubCategory() {
  let { subCategoriesOnCategory, subCatName, isLoading,getSpecificCategory} = useContext(CategoriesContext);
  const [currId, setCurrId] = useState(0);

  // i donot know how can i run this or when
  async function getSpecificCategoryy(currId){
    let {data} = await getSpecificCategory(currId);
    console.log(data.data);
  }
  

  // Get specific SubCategory
  // this must run first to get the categry as it is id of the category which i need for subcategory function
  async function getSpecificSubCat(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
    console.log(data.data.category);
    setCurrId(data.data.category);

    getSpecificCategoryy(currId);
  }

  

  return <>
  <Helmet>
    <title>
      SubCategory
    </title>
  </Helmet>

  <h1 className="text-green-500 text-5xl font-semibold py-4">SubCategories</h1>
  <h2 className="text-green-700 text-4xl font-semibold py-4">{subCatName}</h2>
  
  {isLoading?
  <div className='py-8 w-full flex justify-center'>
  <BeatLoader color="green" />
</div>
  :<>
  <div className="row">
    {
    subCategoriesOnCategory?.map((sub)=>
    <div className="w-1/3 px-4  py-3" key={sub._id}>
      <div className="inner border border-slate-400  rounded-md" onClick={()=>{getSpecificSubCat(sub._id)}}>
        <h3 className='text-slate-800 text-3xl font-semibold p-4'>{sub.name}</h3>
      </div>

    </div>
    )}
  </div>

  </>
  }
  </>
}
