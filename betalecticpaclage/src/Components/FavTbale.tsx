import { useState } from "react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";

interface Package {
  package: string;
  note: string;
}

interface FavTableProps {
  packageData: Package[];
}

const FavTable: React.FC<FavTableProps> = ({ packageData }) => {
  const [favPackages, setFavPackages] = useState<Package[]>(packageData);
  const [singlepackage, setSInglePackage] = useState<Package | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newNote, setNewNote] = useState<string>("");
  const [pack, setPack] = useState<string>("");
  // Deletepackage
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

  // viewPackage
  const openPackage = (index: number) => {
    const modalElement = document.getElementById(
      "view_modal"
    ) as HTMLDialogElement | null;

    if (modalElement) {
      modalElement.showModal();
    } else {
      console.error("Modal element not found");
    }

    // Showing data
    const selectedPackage = favPackages[index];
    setSInglePackage(selectedPackage);
  };

  const openEditmodal = (index: number) => {
    const modalElement = document.getElementById(
      "edits_modal"
    ) as HTMLDialogElement | null;

    if (modalElement) {
      modalElement.showModal();
    } else {
      console.error("Modal element not found");
    }

    setEditIndex(index);
    setNewNote(favPackages[index].note);
    setPack(favPackages[index].package);
  };
  const handleSaveClick = () => {
    if (editIndex !== null) {
      setFavPackages((prevPackages) => {
        const updatedPackages = [...prevPackages];
        updatedPackages[editIndex] = {
          ...updatedPackages[editIndex],
          note: newNote,
        };
        return updatedPackages;
      });

      // Reset edit state
      setEditIndex(null);
      setNewNote("");
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
                <button
                  onClick={() => openPackage(i)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  <AiFillEye />
                </button>
                <button
                  onClick={() => openEditmodal(i)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
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
                      <button className="bg-red-500 text-white px-4 py-2 rounded">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost ">
                            Cancel
                          </button>
                        </form>
                      </button>
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
                    </div>
                  </div>
                </div>
              </dialog>
            </tr>
          ))}
        </tbody>
      </table>
      {/* view dialog */}
      <dialog id="view_modal" className="modal w-fit p-4 rounded-xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost ">X</button>
        </form>

        <div className="bg-white p-16 rounded">
          <h3 className="text-2xl font-semibold mb-2">
            Fav Package : {singlepackage?.package}
          </h3>
          <p className="text-gray-600 text-xl">
            Why it's Fav : {singlepackage?.note}
          </p>
        </div>
      </dialog>

      {/* Edit dialog */}
      <dialog id="edits_modal" className="modal w-fit p-6 rounded-xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost ">X</button>
        </form>
        <p className="text-sm">
          Package: <span className="text-green-600 font-bold">{pack}</span>
        </p>
        <textarea
          id="message"
          rows={4}
          className="block p-10 w-full text-sm rounded-lg border border-gray-300 "
          // placeholder={placeholder}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>

        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost ">
            {" "}
            <button
              onClick={handleSaveClick}
              className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Save
            </button>
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default FavTable;
