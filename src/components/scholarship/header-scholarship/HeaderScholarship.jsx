import FilterDropdown from "@/components/shared/FilterDropdownSimple";
import SearchInput from "@/components/shared/searchInput";
import React, { useEffect, useRef } from "react";
import { fieldOptions, locationOptions, statusOptions } from "@/data/mockData";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQueryClient } from "@tanstack/react-query";


const HeaderScholarship = () => {
 const { filters, updateFilter, setShowAllList } = useScholarship();
  
  const queryClient = useQueryClient();
  
  const hasFilteredRef = useRef(false);

  useEffect(() => {
    // Cek apakah ada filter yang aktif
    const isActive = 
      filters.search !== "" || 
      filters.location !== "" || 
      filters.field !== "" || 
      filters.status !== "";

    if (isActive) {
      hasFilteredRef.current = true;
      setShowAllList(true); 
    } else {
      if (hasFilteredRef.current) {
        
        setShowAllList(false); 
        
        queryClient.cancelQueries({ queryKey: ['all-scholarships'] });
        
        queryClient.removeQueries({ queryKey: ['all-scholarships'] });

        queryClient.invalidateQueries({ queryKey: ['popularity-scholarships'] });
        queryClient.invalidateQueries({ queryKey: ['recommended-scholarships'] });

        hasFilteredRef.current = false;
      }
    }
  }, [filters, queryClient, setShowAllList]);

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
  };

  const handleClearFilter = (key) => {
    updateFilter(key, "");
  };

  const handleSearchChange = (value) => {
    updateFilter("search", value);
  };

  const handleSearchSubmit = (value) => {
    updateFilter("search", value);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center mb-24 mt-12 ">
        <h1 className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-black to-[#666666]">
          FIND YOUR
        </h1>

        <div className="flex flex-row items-center justify-center text-6xl md:text-8xl font-bold">
          <span className="bg-[#ffda39] text-black px-4 py-1 rounded-xl shadow-lg mr-1 transform -rotate-1">
            SCHOLAR
          </span>

          <span className="bg-clip-text text-transparent bg-linear-to-r from-black to-[#666666]">
            SHIP
          </span>
        </div>
        <div className="w-full max-w-4xl px-4 mb-6 mt-2.5">
          <SearchInput
            placeholder="Cari beasiswa berdasarkan bidang, universitas, atau perusahaan..."
            onSearchChange={handleSearchChange}
            onSubmitSearch={handleSearchSubmit}
          />
        </div>

        <div className="flex justify-center gap-4 w-full max-w-4xl px-4">
          <FilterDropdown
            label="Location"
            options={locationOptions}
            value={filters.location}
            onValueChange={(value) => handleFilterChange("location", value)}
            onClear={() => handleClearFilter("location")}
          />
          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
            onClear={() => handleClearFilter("status")}
          />
          <FilterDropdown
            label="Field of Study"
            options={fieldOptions}
            value={filters.field}
            onValueChange={(value) => handleFilterChange("field", value)}
            onClear={() => handleClearFilter("field")}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderScholarship;
