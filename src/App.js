import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';


function App() {
  return (
    <CartProvider>

    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createuser' element={<Signup/>}/>
        <Route path='/myOrder' element={<MyOrder/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
