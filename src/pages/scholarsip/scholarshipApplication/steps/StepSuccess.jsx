import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StepSuccess = ({ scholarshipId }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-8 border-none shadow-sm">
      <CardContent className="p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Application Submitted!</h2>
        <p className="text-gray-500 mb-8">
          Your scholarship application has been successfully submitted. We will notify you about the result via email.
        </p>
        <Button 
          onClick={() => navigate(`/scholarship/show/${scholarshipId}`)}
          className="bg-[#3DBDC2] hover:bg-[#34a9ad] rounded-xl px-8 py-6 text-white font-bold"
        >
          Back to Scholarship Detail
        </Button>
      </CardContent>
    </Card>
  );
};

export default StepSuccess;
