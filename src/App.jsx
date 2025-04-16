import { React ,useEffect,useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserNavbar } from './components/layouts/UserNavbar'
// import './App.css'
import './assets/css/adminlte.css'
import './assets/css/adminlte.min.css'
import { UserSidebar } from './components/layouts/UserSidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Signup } from './components/common/Signup'
import { Login } from './components/common/Login'
import axios from 'axios'
import { SellerSidebar } from './components/seller/SellerSidebar'
import { AddProduct } from './components/seller/AddProduct'
import  Dashboard  from './components/layouts/Dashboard'
import SelDashboard from './components/seller/SelDashboard'
import { SelHome } from './components/seller/SelHome'
// import Home from './components/layouts/Home'
import LandPage from './components/layouts/LandPage'
import ReviewPage from './components/layouts/ReviewPage'
import ContactPage from './components/layouts/Contactpage'
import MyOrderPage from './components/layouts/MyOrderPage'
import OrderPage from './components/layouts/OrderPage'
import ProductDetails from './components/layouts/ProductDetails'
import { LandingPage } from './components/layouts/LandingPage'
import ProductPurchasePage from './components/layouts/ProductPurchasePage'
import MyProducts from './components/seller/MyProduct'
import ProductDetailPage from './components/seller/ProductDetailsPage'

import AdminDashboard from './components/admin/AdminDashboard'
// import { Products } from './components/seller/Products'

// ✅ Import Toaster
import { Toaster } from 'react-hot-toast'
import Cart from './components/layouts/Cart'

function App() {
  
  axios.defaults.baseURL = 'http://localhost:8000';

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === '/' || location.pathname === '/contact') {
      document.body.className = "";
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/signup" || location.pathname === '/' || location.pathname === '/contact' 
          ? ""
          : "app-wrapper"
     }
    >
      {/* ✅ Add Toaster */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <Routes>
        <Route path='/' element={<LandPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/contact' element={<ContactPage/>}></Route> 
        <Route path='/landingpage' element={<LandingPage/>}></Route>

        <Route path='/user' element={<UserSidebar/>}>
          <Route path='' element={<Dashboard/>}></Route>
          <Route path='review' element={<ReviewPage/>}></Route>
          <Route path='contact' element={<ContactPage/>}></Route>
          <Route path='myorder' element={<MyOrderPage/>}></Route>
          <Route path='order' element={<OrderPage/>}></Route>
          {/* <Route path='product' element={<ProductDetails/>}></Route> */}
          <Route path="product" element={<ProductDetails />} />
          <Route path="/user/product/purchase" element={<ProductPurchasePage/>} />  
          <Route path='cart' element={<Cart />}></Route>
        </Route>

        <Route path='/seller' element={<SellerSidebar/>}>
          <Route path='addproduct' element={<AddProduct/>}></Route>
          <Route path='seldashboard' element={<SelDashboard/>}></Route>
          <Route path='selhome' element={<SelHome/>}></Route> 
          <Route path='/seller/review' element={<ReviewPage/>}></Route>
          <Route path="/seller/product" element={<MyProducts />} />
          <Route path="/seller/product/purchase" element={<ProductDetailPage />} />
        </Route>

        <Route path='/admin/*' element={<AdminDashboard/>}></Route>

      </Routes>
    </div>
  )
}

export default App
