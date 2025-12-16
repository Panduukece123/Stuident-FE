import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const FilterDropdown = ({ label, options, onValueChange, value, onClear }) => {
  const handleClear = (e) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="relative">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="w-[180px] cursor-pointer h-12 rounded-md border-gray-300 shadow-sm text-base font-medium transition-all hover:border-gray-400"
          aria-label={`Filter berdasarkan ${label}`}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              className={"cursor-pointer"}
              key={option.value || option.label}
              value={option.value || option.label}
            >
              {option.label || option.value || option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-10 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Clear filter"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default FilterDropdown;
