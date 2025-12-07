import { Search } from "lucide-react";
import React, { useRef } from "react";
import { Input } from "../ui/input";

const SearchInput = ({
  placeholder = "Cari di sini...",
  onSearchChange,
  onSubmitSearch,
}) => {
  const inputRef = useRef(null);
  return (
    <form
      className="relative flex items-center rounded-full"
      onSubmit={(e) => {
        e.preventDefault();

        if (onSubmitSearch && inputRef.current) {
          onSubmitSearch(inputRef.current.value);
        }
      }}
    >
      <button
        type="submit"
        className="absolute left-0 top-0 bottom-0 flex items-center justify-center p-0 m-0 border-none bg-transparent"
        style={{ width: "60px", height: "100%", cursor: "pointer", zIndex: 10 }}
        aria-label="Cari"
      >
        <Search className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </button>

      <Input
        ref={inputRef}
        type={"search"}
        placeholder={placeholder}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmitSearch && onSubmitSearch(e.target.value);
          }
        }}
        className="h-16 pl-16 
    pr-6 
    text-lg 
    rounded-full 
    border-gray-200 
    focus-visible:ring-2 
     "
      />
    </form>
  );
};

export default SearchInput;
