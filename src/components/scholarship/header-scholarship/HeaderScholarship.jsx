import FilterDropdown from "@/components/shared/FilterDropdownSimple";
import SearchInput from "@/components/shared/searchInput";
import React, { useState } from "react";
import {
  scholarshipOptions,
  fieldOptions,
  companyOptions,
} from "@/data/mockData";

const HeaderScholarship = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    console.log(`Filter ${key} diubah menjadi: ${value}`);
  };

  const [filters, setFilters] = useState({
    scholarship: "",
    field: "",
    company: "",
  });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    console.log("Current input:", searchTerm);
  };

  const handleSearchSubmit = (value) => {
    alert(
      `Mencari Beasiswa untuk: ${value} Filter aktif: ${JSON.stringify(
        filters
      )}`
    );
    // logic panggil api atau filter data berdasarkan value
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

          <span className="bg-clip-text text-transparent bg-linear-to-r from-black to-[#666666]">SHIP</span>
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
            label="Scholarship"
            options={scholarshipOptions}
            onvalueChange={(value) => handleFilterChange("scholarship", value)}
          />
          <FilterDropdown
            label="Filed of Study"
            options={fieldOptions}
            onvalueChange={(value) => handleFilterChange("field", value)}
          />
          <FilterDropdown
            label="Company"
            options={companyOptions}
            onvalueChange={(value) => handleFilterChange("company", value)}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderScholarship;
