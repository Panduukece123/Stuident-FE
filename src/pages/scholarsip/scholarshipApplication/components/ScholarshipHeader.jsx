import React from "react";
import { MapPin, Users, Clock } from "lucide-react";

const ScholarshipHeader = ({ scholarship }) => {
  const createdAt = scholarship?.created_at ? new Date(scholarship.created_at) : null;
  const formattedDate = createdAt 
    ? createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  return (
    <div className="mb-10">
      <p className="text-gray-400 text-xs font-medium mb-3">Applying for...</p>
      <div className="flex items-start gap-5">
        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
          <img src={scholarship?.organization?.logo_full_url  } alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-1">
            {scholarship?.name || "Scholarship Name"}
          </h1>
          <p className="text-gray-500 font-medium mb-3">
            {scholarship?.organization?.name || "Organization"}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {scholarship?.location || "-"}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><Users size={14} /> {scholarship?.applications_count || "0"} participants</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipHeader;

