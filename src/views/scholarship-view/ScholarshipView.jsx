import React from "react";
import ScholarshipContent from "../../components/scholarship/scholarship-content/ScholarshipContent";
import { ScholarshipProvider } from "../../context/ScholarshipContext";
import { ScholarshipHero } from "@/components/section/ScholarshipHero";

const ScholarshipView = () => {
  return (
    <ScholarshipProvider>
      <div>
        <ScholarshipHero />
        <ScholarshipContent />
      </div>
    </ScholarshipProvider>
  );
};

export default ScholarshipView;
