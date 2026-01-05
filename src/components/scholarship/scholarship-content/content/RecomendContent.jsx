import React from "react";
import { Loader2, Star, Sparkles } from "lucide-react"; // Tambah Star & Sparkles
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";
import { ScholarshipCard } from "@/components/shared/ScholarshipCard";

const RecomendContent = () => {
  const { filters } = useScholarship();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["recommended-scholarships", filters],
    queryFn: async () => {
      const params = { is_recommended: 1, ...filters };
      const response = await scholarshipService.getScholarships(params);

      if (!response.sukses) {
        throw new Error("Failed to fetch recommended scholarships");
      }
      return response.data;
    },
    select: (data) =>
      data
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
    <div className="flex flex-col gap-6 px-8 lg:px-16 mb-8 mt-12">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="bg-blue-100 p-2 rounded-full">
            {/* Ikon Star dengan fill agar terlihat solid */}
            <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
        </div>
        <div>
            <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
                Rekomendasi Untuk Anda    
            </h3>
            <p className="text-sm text-gray-500">
                Rekomendasi beasiswa berdasarkan profil Anda
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            image={scholarship.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RecomendContent;