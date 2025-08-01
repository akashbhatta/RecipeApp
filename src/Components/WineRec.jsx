import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export function WineRec() {
  const [wine, setWine] = useState("");
  const [suggestedWines, setSuggestedWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWines = async (wineType = "merlot") => {
    setError("");
    setSuggestedWines([]);
    setLoading(true);

    try {
      const res = await axios.get(
        "https://api.spoonacular.com/food/wine/recommendation",
        {
          params: {
            wine: wineType,
            number: 8,
            apiKey: API_KEY,
          },
        }
      );

      setSuggestedWines(res.data.recommendedWines || []);
    } catch (err) {
      console.error("Wine fetch error:", err.response?.data || err.message);
      setError("Failed to load wine suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWines();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        🍷Wine Recommendations
      </h2>

      <div className="flex justify-center gap-4 mb-10 ">
        <input
          type="text"
          value={wine}
          onChange={(e) => setWine(e.target.value)}
          placeholder="Search for a wine..."
          className="p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500 shadow bg-amber-50"
        />
        <button
          onClick={() => fetchWines(wine || "merlot")}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-300 animate-pulse">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-400 font-semibold">{error}</p>
      )}

      {suggestedWines.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full px-4">
    {suggestedWines.map((wine, idx) => (
      <div
        key={idx}
        className="bg-gray-700 rounded-lg p-3 shadow-md hover:scale-105 transform transition duration-300 overflow-hidden"
      >
        <h3 className="text-base font-semibold mb-2 text-white">{wine.title}</h3>
        <img
          src={wine.imageUrl}
          alt={wine.title}
          className="rounded w-full h-36 object-contain bg-white mb-3"
        />
        <p className="text-xs text-gray-300 mb-2 line-clamp-5">{wine.description}</p>
        <a
          href={wine.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          View Wine
        </a>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
export default WineRec;