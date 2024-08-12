import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CounterContextProvider from './Context/CouterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CardContextProvider from './Context/CardContext'
import toast, { Toaster } from 'react-hot-toast'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './Context/WishListContext'
import CategoriesContextProvider from './Context/CategoriesContext'
import BrandsContextProvider from './Context/BrandsContext'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'
import { Offline, Online } from 'react-detect-offline'
import { Helmet } from 'react-helmet'
import Addresses from './components/Addresses/Addresses'
import AddressesContextProvider from './Context/AddressesContext'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import AccountPassword from './components/AccountPassword/AccountPassword'
import SubCategory from './components/SubCategory/SubCategory'

import offlineImage from './assets/images/offline.png'

let query = new QueryClient();

let x = createBrowserRouter([
  {path:'/Ecommerce-App/',element:<Layout/> , children:[
    {index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
    // {path:'Ecommerce-App/', element: <ProtectedRoute><Home/></ProtectedRoute>},

    {path:'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>},
    {path:'subcat', element: <ProtectedRoute><SubCategory /></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id/:category', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},

    {path:'checkout/:cartId', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},

    {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},

    {path:'addresses',element:<ProtectedRoute><Addresses/></ProtectedRoute>},

    {path:'wishList', element:<ProtectedRoute><WishList/></ProtectedRoute>},

    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    
    {path:'forget-password', element:<ForgotPassword/>},

    {path:'verify-code', element:<VerifyCode/>},

    {path:'reset-password', element:<AccountPassword/> },

    {path:'/home', element: <ProtectedRoute><Home/></ProtectedRoute>},


    /*
    , children:[
      {index:true, element: <ProtectedRoute><Home/></ProtectedRoute>}
    ]}
    */
    

    {path:'*', element:<Notfound/>},

  ]}
])


function App() {
  // const [count, setCount] = useState(0)

  return <>
  <Helmet>
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />

  </Helmet>

  <div>
    <Online>
      {/* <h1 className='fixed top-16 left-5 border-green-500 text-green-700 text-2xl border py-2 px-12 rounded'>
        You are online 
      </h1> */}
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CounterContextProvider>
            
            <CardContextProvider>
              <WishListContextProvider>
                <CategoriesContextProvider>
                  <BrandsContextProvider>
                    <AddressesContextProvider>

                      <RouterProvider router={x}></RouterProvider>
                      <ReactQueryDevtools initialIsOpen='false'></ReactQueryDevtools>

                    </AddressesContextProvider>
                    
                  </BrandsContextProvider>

                </CategoriesContextProvider>

              </WishListContextProvider>
              
              <Toaster></Toaster>

            </CardContextProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
      
    </Online>

    <Offline >
      {/* <div className='mx-auto text-center'> 
      <h1 className='bg-slate-50 border-red-500 text-red-700 text-4xl font-semibold border p-10 py-20 rounded'> 
       fixed top-16 left-0  
      You are offline (surprise!)
      </h1>
      {/* </div> */}

      <div className=" text-slate-600 h-100 ">
        <h2 className='font-semibold text-4xl pt-3'>OOP!</h2>
        <h1 className='font-semibold text-5xl py-4'>You're Offline !</h1>
        <div className="image flex items-center justify-center my-10">
          <img src={offlineImage} alt="" className='block w-fit'/>
        </div>
        <p>Unfortunately the website is down for a bit of maintanace right now. We will be online as soon as possible.</p>
        <p>Please, check again the connection in a little while, Thank you!</p>
      </div>
      
    </Offline>
  </div>

</>
  
}

export default App
