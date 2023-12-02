import React, { useState } from "react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";

interface Package {
  package: string;
}

interface FavTableProps {
  packageData: Package[];
}

const FavTable: React.FC<FavTableProps> = ({ packageData }) => {
  const [favPackages, setFavPackages] = useState<Package[]>(packageData);

  const deletePackage = (index: number) => {
    const deletePackages = [...favPackages];
    deletePackages.splice(index, 1);
    setFavPackages(deletePackages);
    localStorage.setItem("favpackage", JSON.stringify(deletePackages));
  };

  const openModaleDelte = () => {
    const modalElement = document.getElementById(
      "edit_modal"
    ) as HTMLDialogElement | null;

    if (modalElement) {
      modalElement.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

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
          {favPackages.map((ele, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{ele.package}</td>
              <td className="py-2 px-4 border-b border-l flex space-x-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  <AiFillEye />
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <AiFillEdit />
                </button>
                <button
                  onClick={openModaleDelte}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <AiFillDelete />
                </button>
              </td>
              {/* delete dialog */}
              <dialog id="edit_modal" className="modal w-fit p-3 rounded-xl">
                <div className="container mx-auto p-16">
                  <div className="bg-white p-8">
                    <p className="mb-4 text-xl">
                      Are you sure you want to delere?
                    </p>
                    <div className="flex justify-center space-x-4">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost ">
                          {" "}
                          <button
                            onClick={() => deletePackage(i)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                          >
                            Yes
                          </button>
                        </button>
                      </form>
                      <button className="bg-red-500 text-white px-4 py-2 rounded">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost ">
                            Cancel
                          </button>
                        </form>
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavTable;
