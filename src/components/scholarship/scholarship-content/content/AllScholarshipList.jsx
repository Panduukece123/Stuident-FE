import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, SearchX, Building2, CalendarDays } from "lucide-react";
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ScholarshipCard } from "@/components/shared/ScholarshipCard";

const AllScholarshipList = () => {
  const { filters } = useScholarship();

  
  const {data:scholarships=[], isLoading} = useQuery({
    queryKey: ['all-scholarships', filters],
    queryFn: async () => {
      const response = await scholarshipService.getScholarships(filters);
      if (!response.sukses) {
        throw new Error('Failed to fetch scholarships');
      }
      return response.data;
    },
    placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 mb-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border overflow-hidden h-[450px] animate-pulse"
          >
            <div className="h-48 bg-gray-200 w-full" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-20 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl mx-4 border border-dashed border-slate-300">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <SearchX className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700">
          Tidak ada beasiswa ditemukan
        </h3>
        <p className="text-slate-500 text-sm mt-1 max-w-md text-center px-4">
          Kami tidak dapat menemukan beasiswa yang cocok dengan filter Anda.
          Coba kurangi filter atau gunakan kata kunci lain.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => window.location.reload()} 
        >
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mx-4 mb-16 mt-16">
      <div className="flex flex-row justify-between items-end px-1 border-b pb-4 border-gray-100">
        <div>
          <h3 className="font-bold text-2xl text-slate-800">Hasil Pencarian</h3>
          <p className="text-slate-500 text-sm mt-1">
            Menampilkan{" "}
            <span className="font-semibold text-primary">
              {scholarships.length}
            </span>{" "}
            peluang beasiswa
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        
        {scholarships.map((scholarship) => (
          <ScholarshipCard
                      key={scholarship.id}
                      id={scholarship.id}
                      name={scholarship.name}
                      organization={scholarship.organization?.name}
                      description={scholarship.description}
                      location={scholarship.location}
                      status={scholarship.status}
                      studyField={scholarship.study_field}
                      deadline={scholarship.deadline}
                      image_url={scholarship.image_url}
                    />
          
        ))}
      </div>
    </div>
  );
};

export default AllScholarshipList;
