import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
export default function Fav() {
  const [packageData, setPackageData] = useState([]);
  useEffect(() => {
    const get_local_data = localStorage.getItem("favpackage");
    if (get_local_data) {
      const parsedData = JSON.parse(get_local_data);
      setPackageData(parsedData);
    }
  }, []);
  console.log("Data :", packageData);

  return (
    <div>
      <h3 className="text-3xl mt-5 ml-5 mb-5 font-medium">
        Welcome to Fovrite NPM Packages
      </h3>
      {packageData.length > 0 ? (
        <div className="p-4 flex items-center justify-center">
          <div className="h-full bg-white h-[100%] w-[80%] p-4 border-4 shadow-lg p-8">
            <RouterLink to="/packages">
              <button className="float-right bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
                Add Fav
              </button>
            </RouterLink>
            {/* Table content here */}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
