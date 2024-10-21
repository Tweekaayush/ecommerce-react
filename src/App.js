import { useEffect, lazy, Suspense } from 'react';
import './App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/productSlice';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Cart from './components/Cart';
import Loader from './components/Loader';
import { auth, onAuthStateChanged } from './config/firebase';
import { getUserDetails, setUser } from './features/userSlice';
import PrivateRoutes from './components/PrivateRoutes'
import Account from './pages/Account';
import Checkout from './pages/Checkout';
const Home = lazy(() => import('./pages/Home'))
const Browse = lazy(() => import('./pages/Browse'));
const Product = lazy(() => import('./pages/Product'));
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Login = lazy(() => import('./pages/Login'))

function App() {

  const [cartStatus, setCartStatus] = useState(false)
  const dispatch = useDispatch()
  const {uid} = useSelector(state=>state.user.data)

  const handleBodyOverflow = () =>{
    cartStatus ? document.body.classList.add('hidden') : document.body.classList.remove('hidden')
  }

  useEffect(()=>{
    handleBodyOverflow()
    dispatch(fetchProducts())
  }, [cartStatus])

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        dispatch(getUserDetails({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          profileImg: user.photoURL
        }))
      }
    }, [uid])
  }, [])

  return (
    <Router>
      <Navbar cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/browse' element={<Browse/>}/>
          <Route exact path='/browse/:category' element={<Browse/>}/>
          <Route exact path='/product/:id' element={<Product/>}/>
          <Route exact path='/wishlist' element={<Wishlist/>}/>
          <Route exact path='/login' element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route exact path='/account' element={<Account/>} />
            <Route exact path='/checkout' element={<Checkout/>} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
