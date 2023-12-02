import { Link as RouterLink } from "react-router-dom";

export default function Favbtn() {
  return (
    <div>
      <RouterLink to="/packages">
        <button className="float-right bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
          Add Fav
        </button>
      </RouterLink>
    </div>
  );
}
