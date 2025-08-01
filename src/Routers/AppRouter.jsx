import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import RecipeApp from '../Components/RecipeApp';
import RecipeDetails from '../Components/RecipleDetails';
import WineRec from '../Components/WineRec';
import MealPlan from '../Components/MealPlan';
import CategoryList from '../Components/CategoryList';
import CategoryPage from '../Components/CategoryPage'; // ✅ Import your new component

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/recipes' element={<RecipeApp />} />
      <Route path='/recipes/:id' element={<RecipeDetails />} />
      <Route path='/winerec' element={<WineRec />} />
      <Route path='/mealplan' element={<MealPlan />} />
      <Route path='/categorylist' element={<CategoryList />} />
      <Route path='/category/:name' element={<CategoryPage />} /> {/* ✅ NEW */}
    </Routes>
  );
};

export default AppRouter;
