import { createContext, useContext } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children, value }) => {
  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse harus digunakan di dalam CourseProvider");
  }
  return context;
};