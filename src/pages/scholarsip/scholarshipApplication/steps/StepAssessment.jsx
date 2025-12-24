import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StepAssessment = ({ assessmentData, setAssessmentData }) => (
  <Card className="mb-8 border-none shadow-sm">
    <CardContent className="p-6">
      <h2 className="text-base font-bold text-gray-800 mb-6 font-sans">Scholarship Pre-Assessment</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gpa" className="text-sm font-semibold text-gray-700">
              GPA <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="e.g., 3.75"
              value={assessmentData.gpa}
              onChange={(e) => setAssessmentData(prev => ({ ...prev, gpa: e.target.value }))}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="university" className="text-sm font-semibold text-gray-700">
              University <span className="text-red-500">*</span>
            </Label>
            <Input
              id="university"
              type="text"
              placeholder="e.g., Universitas Indonesia"
              value={assessmentData.university}
              onChange={(e) => setAssessmentData(prev => ({ ...prev, university: e.target.value }))}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parent_income" className="text-sm font-semibold text-gray-700">
            Parent Income (per month in IDR)
          </Label>
          <Input
            id="parent_income"
            type="number"
            placeholder="e.g., 5000000"
            value={assessmentData.parent_income}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, parent_income: e.target.value }))}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
          <input
            type="checkbox"
            id="has_other_scholarship"
            checked={assessmentData.has_other_scholarship}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, has_other_scholarship: e.target.checked }))}
            className="w-4 h-4 text-[#3DBDC2] border-gray-300 rounded focus:ring-[#3DBDC2]"
          />
          <Label htmlFor="has_other_scholarship" className="text-sm text-gray-700 cursor-pointer">
            I am currently receiving another scholarship
          </Label>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-10">
        Please fill in all required fields accurately
      </p>
    </CardContent>
  </Card>
);

export default StepAssessment;
