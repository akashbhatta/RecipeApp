import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const RecipeApp = () => {
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const randomOffset = Math.floor(Math.random() * 100);
      const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          number: 10,
          offset: randomOffset,
          addRecipeInformation: true,
          apiKey: API_KEY,
        },
      });
      setSuggestions(res.data.results);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const fetchRecipe = async (id = null, searchQuery = null) => {
    if (!searchQuery?.trim() && !id) return;

    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      let recipeId = id;

      if (!id) {
        const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
          params: {
            query: searchQuery,
            number: 1,
            addRecipeInformation: true,
            apiKey: API_KEY,
          },
        });

        if (res.data.results.length === 0) {
          setError("No recipes found for that search.");
          return;
        }

        recipeId = res.data.results[0].id;
      }

      const recipeRes = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            includeNutrition: true,
            apiKey: API_KEY,
          },
        }
      );

      setRecipe(recipeRes.data);

      // Scroll to recipe view
      const el = document.getElementById("recipe-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Check your API key or quota.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recipes" className="recipes">
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
        <div className="bg-white p-6 rounded shadow w-full max-w-md mb-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-black">
            🍽️ Recipe Finder
          </h1>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchRecipe(null, query)}
              placeholder="Enter food name"
              className="flex-1 border p-2 rounded focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => fetchRecipe(null, query)}
              disabled={!query.trim()}
              className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-500 disabled:opacity-50">
              Search
            </button>
          </div>

          {loading && <p className="text-center text-gray-600 animate-pulse">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {recipe && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-700">{recipe.title}</h2>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-auto rounded mt-3"
              />
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-3"
              >
                View Full Recipe
              </a>

              <div className="mt-3 text-sm text-gray-700">
                <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Cuisine:</strong> {recipe.cuisines?.join(", ") || "N/A"}</p>
                <p><strong>Dish Type:</strong> {recipe.dishTypes?.join(", ") || "N/A"}</p>
                <p><strong>Diets:</strong> {recipe.diets?.join(", ") || "N/A"}</p>
              </div>

              {recipe.nutrition?.nutrients?.length > 0 && (
                <div className="mt-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Nutritional Info (per serving):
                  </h3>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, idx) => (
                      <li key={idx}>
                        {nutrient.name}: {nutrient.amount} {nutrient.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-90 p-6 rounded shadow w-full max-w-6xl mt-10">
            <h2 className="text-xl font-bold text-center text-white mb-6">
              🍽️ You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => fetchRecipe(item.id)}
                  className="bg-gray-100/90 backdrop-blur-md p-3 rounded-lg shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-sm font-medium mt-2 text-center text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeApp;
