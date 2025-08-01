import { useEffect, useState } from 'react';
import AppRouter from './Routers/AppRouter';
import Loading from './Components/Loading';
import Footer from './Pages/Footer';
import React from 'react';
import './index.css';
// import Navbar from './Components/Navbar';

const App = () => {
const [loading, setLoading] = useState(true);
useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=' gradient-bg scroll-smooth'>
      {/* <Navbar onSearch={(query) => console.log('Search:', query)} /> */}
      {loading ? <Loading /> : <AppRouter />}
   
    
    </div>
  );
}

export default App;


