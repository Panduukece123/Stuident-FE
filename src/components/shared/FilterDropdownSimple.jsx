
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterDropdown = ({ 
    label, 
    options, 
    onValueChange 
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger 
        className="w-[180px] cursor-pointer h-12 rounded-md border-gray-300 shadow-sm text-base font-medium transition-all hover:border-gray-400"
        aria-label={`Filter berdasarkan ${label}`}
      >
        <SelectValue placeholder={label} />
       
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem className={'cursor-pointer'} key={option.value || option.label} value={option.value || option.label}>
            {option.label || option.value || option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;