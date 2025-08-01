import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function MealPlan() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/mealplanner/generate`,
          {
            params: {
              timeFrame: "day",
              apiKey: API_KEY, // <-- FIXED HERE
            },
          }
        );

        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
      <h2 className="text-white text-3xl font-bold text-center mb-6">🍽️ Today's Meal Plan</h2>

      {meals.length === 0 ? (
        <p className=" text-white">No meals available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal, idx) => (
            <div
              key={idx}
              className="bg-gray-700 rounded-lg p-4 shadow hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{meal.title}</h3>
              <p className="text-sm text-gray-300 mb-2">
                Ready in: {meal.readyInMinutes} mins
              </p>
              <a
                href={`https://spoonacular.com/recipes/${meal.title.replace(/\s+/g, "-").toLowerCase()}-${meal.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlan;
