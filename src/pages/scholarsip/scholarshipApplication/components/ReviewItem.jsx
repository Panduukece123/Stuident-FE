import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const ReviewItem = ({ label, value, status }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-800">{value}</span>
      {status ? (
        <CheckCircle className="text-green-500" size={16} />
      ) : (
        <AlertCircle className="text-amber-500" size={16} />
      )}
    </div>
  </div>
);

export default ReviewItem;
