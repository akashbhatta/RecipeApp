import React, { useEffect, useState } from 'react';
import RecipeApp from '../Components/RecipeApp';
import Navbar from '../Components/Navbar';
import WineRec from '../Components/WineRec';
import Footer from './Footer';
import MealPlan from '../Components/MealPlan';

const Home = () => {
  const [animate, setAnimate] = useState(false);
   const [category, setCategory] = useState("");
  const handleSearch = (query)=>{
    console.log("Searching for:", query);
  }

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id= "home" className='home'>


    <div className="w-full scroll-smooth font-sans bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <Navbar onSearch={handleSearch} />
   
      {/* Hero Section */}
      <section 
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-12 py-20"
        style={{
          backgroundImage: "url('/Food.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      

        {/* Hero Content */}
        <div className="relative z-10 text-white text-center max-w-3xl space-y-6">
          <h1
            className={`
              text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg
              transition-all duration-1000
              ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Welcome to <span className="underline decoration-white">RecipeApp</span>
          </h1>

          <p
            className={`
              text-lg sm:text-xl font-bold text-gray-700tracking-wide
              transition-all duration-1000 delay-200
              ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Discover the recipes of varieties of cuisines for every taste and occasion.
            Cook, explore, and fall in love with food all over again.
          </p>

          <a
            href="#search"
            className={`
              inline-block px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md
              hover:bg-gray-200 transition-all duration-200 delay-100
              ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
           🍽️Get Started🍽️
          </a>
        </div>
      </section>

      {/* Recipe Search Section */}
      <section id="search" className="py-16 ">
        <RecipeApp />
        <WineRec/>
        <MealPlan/>
     

      <Footer onSelectCategory={(category) => setSelectedCategory(category)} />

      </section>
    </div>
    </section>
  );
};

export default Home;
