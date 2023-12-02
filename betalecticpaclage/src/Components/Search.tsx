// import React from "react";
// import TextArea from "./TextArea";
// import TextInput from "./TextInput";

// export default function Search() {
//   return (
//     <div className="p-4 flex items-center justify-center">
//       <div className="h-full bg-white h-[95vh] w-[80%] p-4 border-4 shadow-lg p-8">
//         <TextInput />
//         <TextArea />
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

interface Result {
  package: {
    name: string;
    description: string;
  };
}

const Search: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(e.target.value);
  };

  const handleSubmission = () => {
    if (selectedPackage) {
      // Store data in local storage
      const favPackageData = {
        package: selectedPackage,
        note: textAreaContent,
      };
      const existingData = localStorage.getItem("favpackage");
      const newData = existingData
        ? [...JSON.parse(existingData), favPackageData]
        : [favPackageData];
      localStorage.setItem("favpackage", JSON.stringify(newData));

      // Clear selected package and textarea content
      setSelectedPackage(null);
      setTextAreaContent("");
    }
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (term.trim() !== "") {
        setLoading(true);
        axios
          .get(`https://api.npms.io/v2/search?q=${term}`)
          .then((response) => {
            setResults(response.data.results);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [term]);

  return (
    <div>
      <div className="p-4 flex items-center justify-center">
        <div className="h-full bg-white h-[95vh] w-[80%] p-4 border-4 shadow-lg p-8">
          <TextInput
            placeholder="Search for packages..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {loading && <p>Loading...</p>}
          <ul>
            {results.map((result) => (
              <li key={result.package.name}>
                <label>
                  <input
                    type="radio"
                    name="package"
                    value={result.package.name}
                    checked={selectedPackage === result.package.name}
                    onChange={() => setSelectedPackage(result.package.name)}
                  />
                  {result.package.name}
                </label>
              </li>
            ))}
          </ul>
          <div>
            <TextArea
              placeholder="Write something..."
              value={textAreaContent}
              onChange={handleTextAreaChange}
            />
            <button onClick={handleSubmission}>Submit</button>
          </div>
          {selectedPackage && <p>Selected Package: {selectedPackage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;
