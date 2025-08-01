import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; // <-- Add this line

export default function CategoryPage() {
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const typeMap = {
    breakfast: 'breakfast',
    lunch: 'main course',
    dinner: 'main course',
    drinks: 'beverage',
  };

  useEffect(() => {
    const type = typeMap[name?.toLowerCase()];
    if (!type) {
      console.warn('Invalid category:', name);
      setRecipes([]);
      setLoading(false);
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: API_KEY,
            type: type,
            number: 5,
          },
        });

        console.log("Fetched recipes:", res.data.results); // Debug
        setRecipes(res.data.results || []);
      } catch (err) {
        console.error('API error:', err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [name]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-4">{name} Recipes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found for {name}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded shadow p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
