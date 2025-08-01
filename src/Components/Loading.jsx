import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-gray-900 via-gray-600 to-black">
      <div className="text-center space-y-4">
        <h1 className="text-white text-5xl font-extrabold tracking-wide animate-pulse drop-shadow-lg">
          RecipeApp
        </h1>
        <p className="text-white text-2xl font-light tracking-wider animate-bounce">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
