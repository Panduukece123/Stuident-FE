import React from "react";
import ComingSoonSection from "./content/ComingSoonSection";
import PopularScholarship from "./content/PopularScholarship";
import RecomendContent from "./content/RecomendContent";
import AllScholarshipList from "./content/AllScholarshipList";
import { useScholarship } from "@/context/ScholarshipContext";

const ScholarshipContent = () => {
  const { isFilterActive, showAllList } = useScholarship();

  if (isFilterActive() || showAllList) {
    return <AllScholarshipList />;
  }

  return (
    <>
      <RecomendContent />
      <PopularScholarship />
      <ComingSoonSection />
    </>
  );
};

export default ScholarshipContent;
