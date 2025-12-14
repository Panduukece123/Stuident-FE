import React from "react";
import HeaderScholarship from "../../components/scholarship/header-scholarship/HeaderScholarship";
import ScholarshipContent from "../../components/scholarship/scholarship-content/ScholarshipContent";
import { ScholarshipProvider } from "../../context/ScholarshipContext";

const ScholarshipView = () => {
  return (
    <ScholarshipProvider>
      <div>
        <HeaderScholarship />
        <ScholarshipContent />
      </div>
    </ScholarshipProvider>
  );
};

export default ScholarshipView;
