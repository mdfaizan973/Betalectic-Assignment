import React from "react";

import { Link as RouterLink } from "react-router-dom";
export default function Fav() {
  return (
    <div>
      <div className="p-4 flex items-center justify-center h-screen">
        <div className="h-[95vh] w-[80%] bg-white p-4 border-4 shadow-lg flex flex-col items-center justify-center">
          <label className="mb-2 text-xl text-gray-900 mt-8">
            You don't have any favs yet! Please add.
          </label>
          <RouterLink to="/packages">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Fav
            </button>
          </RouterLink>
        </div>
      </div>

      <div className="p-4 flex items-center justify-center">
        <div className="h-full bg-white h-[95vh] w-[80%] p-4 border-4 shadow-lg p-8">
          Show data
        </div>
      </div>
    </div>
  );
}
