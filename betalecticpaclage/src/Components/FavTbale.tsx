interface Package {
  name: string;
}

interface FavTableProps {
  packageData: Package[];
}
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
const FavTable: React.FC<FavTableProps> = ({ packageData }) => {
  console.log("packageData,", packageData);
  return (
    <div className="container mx-auto p-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b w-[65%]">Package Name</th>
            <th className="py-2 px-4 border-b border-l w-[35%]">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">React js</td>
            <td className="py-2 px-4 border-b border-l flex space-x-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <AiFillEye />
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <AiFillEdit />
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <AiFillDelete />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FavTable;
