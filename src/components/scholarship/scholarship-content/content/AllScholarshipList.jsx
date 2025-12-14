import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, SearchX, Building2, CalendarDays } from "lucide-react";
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

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
    <div className="flex flex-col gap-6 mx-4 mb-16">
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
          <Link to={`/scholarship/show/${scholarship.id}`}>

         
          <Card
            key={scholarship.id}
            className="p-0 group bg-white h-full flex flex-col overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl"
          >
            {/* Image Wrapper Relative untuk Badge Status */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={scholarship.image || "https://placehold.co/300x200"}
                alt={scholarship.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Status Badge Overlay */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                    scholarship.status === "open"
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {scholarship.status
                    ? scholarship.status.toUpperCase()
                    : "UNKNOWN"}
                </span>
              </div>
            </div>

            <CardContent className="p-5 flex flex-col flex-1">
              <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                {scholarship.study_field}
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 leading-tight min-h-12 group-hover:text-primary transition-colors">
                {scholarship.name}
              </h3>

              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                <Building2 size={14} className="text-slate-400" />
                <span className="font-medium truncate">
                  {scholarship.organization?.name || "Unknown Organization"}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                {scholarship.description}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span className="truncate max-w-[120px]">
                      {scholarship.location}
                    </span>
                  </div>
                  {scholarship.deadline && (
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span>
                        {new Date(scholarship.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <Link to={`/scholarship/show/${scholarship.id}`}>
                <Button className="w-full bg-[#3DBDC2] hover:bg-[#2da8ad] text-white font-semibold h-10 rounded-lg shadow-sm transition-all active:scale-95">
                  See Detail
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
           </Link>
        ))}
      </div>
    </div>
  );
};

export default AllScholarshipList;
