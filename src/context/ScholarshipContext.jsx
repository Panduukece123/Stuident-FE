import React, { createContext, useContext, useState } from "react";

const ScholarshipContext = createContext();

export const useScholarship = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error("useScholarship must be used within ScholarshipProvider");
  }
  return context;
};

export const ScholarshipProvider = ({ children }) => {
  // 1. Tambahkan state baru untuk mengontrol tampilan list
  const [showAllList, setShowAllList] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    scholarship: "",
    field: "",
    company: "",
    status: "",
    location: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setShowAllList(true); 
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      scholarship: "",
      field: "",
      company: "",
      status: "",
      location: "",
    });
    // Reset juga tampilan list ke home
    setShowAllList(false); 
  };

  const isFilterActive = () => {
    return (
      filters.search !== "" ||
      filters.field !== "" ||
      filters.status !== "" ||
      filters.location !== ""
    );
  };

  return (
    <ScholarshipContext.Provider
      value={{ 
        filters, 
        updateFilter, 
        resetFilters, 
        isFilterActive,
        showAllList,     
        setShowAllList   
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};