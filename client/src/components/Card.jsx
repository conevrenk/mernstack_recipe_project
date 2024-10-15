import { useState } from "react";
import { TbClockHour8 } from "react-icons/tb";
const Card = ({ recipe }) => {
 
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="rounded-lg h-[150px] w-full object-cover"
        />

        <p className="bg-red-500 text-white rounded-lg py-1 px-2 font-semibold flex items-center gap-2 absolute bottom-1 left-1">
          <TbClockHour8 />
          <span>{recipe.recipeTime} dakika </span>
        </p>
      </div>
      <h2 className="my-3 text-xl font-semibold">{recipe.recipeName} </h2>
      <p className="text-gray-500">{recipe.category} </p>
      <p className="flex gap-3 mt-3">
        <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
          {recipe.ingredients[0]}{" "}
        </span>
        <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
          {recipe.ingredients[1]}{" "}
        </span>
      </p>
    </div>
  );
};

export default Card;
