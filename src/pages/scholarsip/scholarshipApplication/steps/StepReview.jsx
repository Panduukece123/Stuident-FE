import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReviewItem from "../components/ReviewItem";

const StepReview = ({ applicationDetail }) => (
  <Card className="mb-8 border-none shadow-sm">
    <CardContent className="p-6">
      <h2 className="text-base font-bold text-gray-800 mb-6 font-sans">Review Your Application</h2>
      
      {/* Documents Review */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Uploaded Documents</h3>
        <div className="space-y-3">
          <ReviewItem 
            label="CV" 
            value={applicationDetail?.cv_path ? "Uploaded" : "Not uploaded"} 
            status={!!applicationDetail?.cv_path}
          />
          <ReviewItem 
            label="Transcript" 
            value={applicationDetail?.transcript_path ? "Uploaded" : "Not uploaded"} 
            status={!!applicationDetail?.transcript_path}
          />
          <ReviewItem 
            label="Recommendation Letter" 
            value={applicationDetail?.recommendation_path ? "Uploaded" : "Not uploaded"} 
            status={!!applicationDetail?.recommendation_path}
          />
          <ReviewItem 
            label="Motivation Letter" 
            value={applicationDetail?.motivation_letter || applicationDetail?.motivation_letter_text ? "Provided" : "Not provided"} 
            status={!!(applicationDetail?.motivation_letter || applicationDetail?.motivation_letter_text)}
          />
        </div>
      </div>

      {/* Assessment Review */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Pre-Assessment Data</h3>
        <div className="space-y-3">
          <ReviewItem label="GPA" value={applicationDetail?.gpa || "-"} status={!!applicationDetail?.gpa} />
          <ReviewItem label="University" value={applicationDetail?.university || "-"} status={!!applicationDetail?.university} />
          <ReviewItem 
            label="Parent Income" 
            value={applicationDetail?.parent_income ? `Rp ${parseInt(applicationDetail.parent_income).toLocaleString("id-ID")}` : "-"} 
            status={!!applicationDetail?.parent_income}
          />
          <ReviewItem 
            label="Other Scholarship" 
            value={applicationDetail?.has_other_scholarship ? "Yes" : "No"} 
            status={true}
          />
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-10">
        Please review all information before submitting your application
      </p>
    </CardContent>
  </Card>
);

export default StepReview;
