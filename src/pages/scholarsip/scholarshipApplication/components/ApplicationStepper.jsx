import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Documents Requirement" },
  { id: 2, label: "Scholarship Pre-Assessment" },
  { id: 3, label: "Review and Finalizing Resume" },
  { id: 4, label: "Submit Resume" },
];

const ApplicationStepper = ({ currentStep }) => (
  <div className="mb-12 relative px-4">
    <div className="flex items-start justify-between">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentStep >= step.id ? "bg-[#3DBDC2] shadow-[0_0_0_4px_rgba(61,189,194,0.2)]" : "bg-white border-2 border-gray-200"
          }`}>
            {currentStep > step.id ? <Check className="text-white" size={12} /> : 
             <div className={`w-2 h-2 rounded-full ${currentStep === step.id ? "bg-white" : "bg-gray-200"}`} />}
          </div>
          <span className={`text-[10px] mt-3 font-semibold text-center leading-tight max-w-[80px] ${
            currentStep >= step.id ? "text-gray-700" : "text-gray-400"
          }`}>
            {step.label}
          </span>
          {index < STEPS.length - 1 && (
            <div className={`absolute top-3 left-[50%] w-full h-[2px] -z-10 ${
              currentStep > step.id ? "bg-[#3DBDC2]" : "bg-gray-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ApplicationStepper;
