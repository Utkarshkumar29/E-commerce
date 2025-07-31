import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Dashbord from './pages/Dashboard';
import SingleProduct from './pages/singleProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashbord/>} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
