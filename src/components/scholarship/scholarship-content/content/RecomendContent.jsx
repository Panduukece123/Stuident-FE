import React from "react";
import { MapPin, Loader2 } from "lucide-react";
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const RecomendContent = () => {
  
  const { filters } = useScholarship(); 

  const {data: scholarships = [], isLoading} = useQuery({
    queryKey: ['recommended-scholarships', filters],

    queryFn: async () => {
      const params = { is_recommended: 1, ...filters }; 
      const response = await scholarshipService.getScholarships(params);

      if (!response.sukses) {
        throw new Error('Failed to fetch recommended scholarships');
      }
      return response.data;
  },
  select: (data) => data
  .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
  .slice(0, 4),

  placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoading && scholarships.length === 0) {
     return null; 
  }

  return (
    <div className="flex flex-col gap-6 mx-4 mb-16">
      <h3 className="font-medium text-2xl">Recommended</h3>
      <div className="grid grid-cols-2 gap-6">

     

      {scholarships.map((scholarship) => (
        <Link
        to={`/scholarship/show/${scholarship.id}`}
          key={scholarship.id}
          className=" bg-white p-4 cursor-pointer border-primary border-[3px] rounded-xl mx-3   hover:shadow-xl hover:-translate-y-1  duration-300 transition-all block w-full"
        >
          <h3 className="font-medium text-3xl mb-3">{scholarship.name}</h3>

          <div className="flex flex-row gap-2">
            <MapPin
              size={35}
              stroke="#ffffff"
              strokeWidth={2}
              fill="#757575"
            />
            <h4 className="font-medium text-2xl mb-2">
              {scholarship.organization?.name || "Unknown Organization"}
            </h4>
          </div>

          <p className="font-light mb-3 line-clamp-3">
            {scholarship.description.substring(0, 150)}...
          </p>

          <div className="flex flex-wrap gap-2 text-sm mt-2">
            <span className="bg-primary/10 px-3 py-1 rounded-full font-medium">
              {scholarship.location}
            </span>
            {/* Logic warna status */}
            <span className={`px-3 py-1 rounded-full font-medium ${
                scholarship.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {scholarship.status.toUpperCase()}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {scholarship.study_field}
            </span>
          </div>
        </Link>
        
      ))}
       </div>
    </div>
  );
};

export default RecomendContent;