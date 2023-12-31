import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import "./Style/Search.css";
import Loading from "./Loading";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Result {
  package: {
    name: string;
    description: string;
  };
}

const Search: React.FC = () => {
  const [inp, setInp] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(e.target.value);
  };

  const handleSubmission = () => {
    if (selectedPackage) {
      const favPackageData = {
        package: selectedPackage,
        note: textAreaContent,
      };
      const existingData = localStorage.getItem("favpackage");
      const newData = existingData
        ? [...JSON.parse(existingData), favPackageData]
        : [favPackageData];
      localStorage.setItem("favpackage", JSON.stringify(newData));
      toast.success("Package Added!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelectedPackage(null);
      setTextAreaContent("");
    }
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (inp.trim() !== "") {
        setLoading(true);
        axios
          .get(`https://api.npms.io/v2/search?q=${inp}`)
          .then((response) => {
            setResults(response.data.results);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 1500);

    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [inp]);

  return (
    <div>
      <ToastContainer />
      <RouterLink to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">
          Go to fav
        </button>
      </RouterLink>

      <div className="p-4 flex items-center justify-center">
        <div className="h-full bg-white h-[95vh] w-[80%] p-4 border-4 shadow-lg p-8">
          <TextInput
            placeholder="Search for packages..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-900 mt-8">
            Results
          </label>
          {loading ? (
            <Loading />
          ) : (
            <ul className="package-content mt-8">
              {results.map((result) => (
                <li key={result.package.name} className="mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="package"
                      value={result.package.name}
                      checked={selectedPackage === result.package.name}
                      onChange={() => setSelectedPackage(result.package.name)}
                      className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-gray-800">{result.package.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          <div>
            <TextArea
              placeholder="Why is this your Fav......"
              value={textAreaContent}
              onChange={handleTextAreaChange}
            />
            <button
              className="float-right bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={handleSubmission}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
