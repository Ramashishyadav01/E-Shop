import React, { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import { Toaster } from 'react-hot-toast'
import Loader from './components/shared/Loader'

const Home = lazy(() => import('./components/home/Home'))
const Products = lazy(() => import('./components/products/Products'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Cart = lazy(() => import('./components/cart/Cart'))
const LogIn = lazy(() => import('./components/auth/LogIn'))
const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const Register = lazy(() => import('./components/auth/Register'))
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'))
const Checkout = lazy(() => import('./components/checkout/Checkout'))
const PaymentConfirmation = lazy(() => import('./components/checkout/PaymentConfirmation'))
const Profile = lazy(() => import('./components/Profile'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const Dashboard = lazy(() => import('./components/admin/dashboard/Dashboard'))
const AdminProducts = lazy(() => import('./components/admin/products/AdminProducts'))
const Sellers = lazy(() => import('./components/admin/sellers/Sellers'))
const Category = lazy(() => import('./components/admin/categories/Category'))
const Orders = lazy(() => import('./components/admin/order/Orders'))

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />

            <Route element={<PrivateRoute publicPage />}>
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/order-confirm' element={<PaymentConfirmation />} />
            </Route>

            <Route element={<PrivateRoute adminOnly />}>
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='products' element={<AdminProducts />} />
                <Route path='sellers' element={<Sellers />} />
                <Route path='orders' element={<Orders />} />
                <Route path='categories' element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
