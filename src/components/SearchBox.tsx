import { FiSearch } from "react-icons/fi";
import { useRef } from "react";

type SearchBoxProps = {
  userInput: string;
  setUserInput: (userInput: string) => void;
  handleSubmit: (e: any) => void;
  setIsMounted: (shouldFetch: boolean) => void;
};

export const SearchBox = ({
  userInput,
  setUserInput,
  handleSubmit,
  setIsMounted,
}: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white w-80 mx-auto shadow-2xl my-5 rounded-2x l p-2 flex items-center ">
        <input
          type="text"
          value={userInput}
          className="w-full p-2 rounded-2xl outline-none"
          onChange={(e) => {
            setIsMounted(false);

            setUserInput(e.target.value);
          }}
          placeholder="Search for a city"
        />
        <button type="submit">
          <FiSearch className="text-gray-400 text-2xl cursor-pointer" />
        </button>
      </div>
    </form>
  );
};
