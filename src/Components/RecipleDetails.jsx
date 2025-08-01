
import React from 'react';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <div className="text-center text-gray-500">No recipe selected.</div>;
  }

  const nutrients = recipe?.nutrition?.nutrients;

  return (
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="rounded-lg mb-4" />

      {nutrients ? (
        <div>
          <h3 className="text-lg font-medium">Nutrition Information:</h3>
          <ul className="list-disc list-inside mt-2">
            {nutrients.slice(0, 5).map((n, i) => (
              <li key={i}>
                {n.name}: {n.amount} {n.unit}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No nutrient data available.</p>
      )}
    </div>
  );
};

export default RecipeDetails;

