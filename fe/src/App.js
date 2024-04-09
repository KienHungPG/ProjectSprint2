import './App.css';
import {Routes, Route, useLocation, useNavigate, Navigate} from "react-router-dom"
import { Header } from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/footer/Footer';
import { Login } from './components/login/Login';
import { Content } from './components/body/Content';
import { Details } from './components/body/Details';
import { ShoppingCart } from './components/body/ShoppingCart';
import { ToastContainer } from 'react-toastify';
import { ErrorAll } from './components/body/ErrorAll';
import { History } from './components/body/History';
import { LoginNew } from './components/loginNew/LoginNew';
import { Information } from './components/body/Information';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Content />}/>
      <Route path='/details/:id' element={<Details />}/>
      <Route path='/cart' element={<ShoppingCart />}/>
      <Route path='/error' element={<ErrorAll />}/>
      <Route path='/history' element={<History />}/>
      <Route path='/singup' element={<LoginNew />}/>
      <Route path='/info' element={<Information />}/>
    </Routes>
    <Footer />
    <ToastContainer />
    </>
  );
}

export default App;