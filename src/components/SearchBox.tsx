import { FiSearch } from "react-icons/fi";
import { useRef } from "react";

type SearchBoxProps = {
  userInput: string;
  setUserInput: (userInput: string) => void;
};

// const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   console.log("searching");
// };

export const SearchBox = ({ userInput, setUserInput }: SearchBoxProps) => {
  return (
    <form>
      <div className="bg-white w-80 mx-auto shadow-2xl my-5 rounded-2xl p-2 flex items-center ">
        <input
          type="text"
          value={userInput}
          className="w-full p-2 rounded-2xl outline-none"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          placeholder="Search for a city"
        />
        <FiSearch className="text-gray-400 text-2xl cursor-pointer" />
        {/* <button>Search</button> */}
      </div>
    </form>
  );
};
