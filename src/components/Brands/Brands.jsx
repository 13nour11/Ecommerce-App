import React, { useContext, useEffect, useState } from 'react'
import Style from './Brands.module.css'
import { BrandsContext } from '../../Context/BrandsContext';
import { Helmet } from 'react-helmet';
import { BeatLoader } from 'react-spinners';

export default function Brands() {
    const [brandsDetails, setBrandsDetails] = useState(null);
    const [currId, setCurrId] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    let {getAllBrands} = useContext(BrandsContext);

    async function getBrands(){
      setisLoading(true);
      let {data} = await getAllBrands();
      console.log(data.data);
      setBrandsDetails(data.data);
      setisLoading(false);
    }

    useEffect(()=>{
      getBrands();
    },[]); //brandsDetails

  return <>
  <Helmet>
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />

    <title>
      FreshCart - Brands
    </title>
  </Helmet>
  <h1 className='text-green-500 text-5xl font-semibold py-4'>All Brands</h1>

  {isLoading?
  <div className='py-8 w-full flex justify-center'>
    <BeatLoader color="green" />
  </div>
  :
  <div className="row">
    {brandsDetails?.map((brand)=>
    <div className="w-1/4 p-3" key={brand?._id} onClick={()=>{setPopUp(true); setCurrId(brand._id);}}>
      <div className="inner border border-slate-400  rounded-md">
      <img src={brand.image} alt={brand.name} className='w-full '/>
      <h3 className='text-lg  p-4'>{brand.name}</h3>
      
      </div>
    </div>
    )}
  </div>}
  
  {popUp && (
                <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-gray-800 bg-opacity-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg py-4">
                        <div className="flex items-center justify-between pb-2 border-b px-4">
                            {/* <h3 className="text-xl font-semibold text-gray-900">Modal Title</h3> */}
                            <button className="text-gray-400 hover:text-gray-600 focus:outline-none ms-auto" onClick={() => setPopUp(false)}>
                                <svg className="w-9 h-9" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.707 10l4.147-4.146a.5.5 0 0 0-.708-.708L10 9.293 5.854 5.146a.5.5 0 1 0-.708.708L9.293 10l-4.147 4.146a.5.5 0 1 0 .708.708L10 10.707l4.146 4.147a.5.5 0 0 0 .708-.708L10.707 10z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3 py-1 px-4">
                          {brandsDetails?.map((brand)=>
                          <div className="row" key={brand?._id}>
                            {/* {brandsDetails?.map((brand)=>
                            <div className="flex justify-between items-center" key={brand?._id}>
                              {
                              currId=== brand._id?<>
                              <div className="flex justify-between items-center flex-col">
                                <h3 className='text-4xl font-semibold text-green-600'>{brand.name}</h3>
                                <p className='text-lg  p-4'>{brand.name}</p>
                              </div>
                              <img src={brand.image} alt={brand.name} className='w-1/2'/>
                              </>:null
                              }
                            </div>
                            
                            
                              
                            )

                            } */}
                            
                            {currId === brand._id?<>
                            <div className="w-1/2">
                            <div className="flex justify-between items-center flex-col">
                                <h3 className='text-4xl font-semibold text-green-600'>{brand.name}</h3>
                                <p className='text-lg  p-4'>{brand.name}</p>
                              </div>
                            
                            {/* <div className="w-1/2"> */}
                              <img src={brand.image} alt={brand.name} className='w-1/2'/>
                            {/* </div> */}
                            </div>
                            </>
                        
                            :null
                            }
                          </div>)}
                        </div>
                        <div className="flex justify-end pt-4 px-4 border-t">
                            <button className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none" onClick={() => setPopUp(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

  </>
}
