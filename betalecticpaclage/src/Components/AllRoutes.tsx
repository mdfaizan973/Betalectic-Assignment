import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import Fav from "./Fav";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Fav />} />
        <Route path="/packages" element={<Search />} />
      </Routes>
    </div>
  );
}
