import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SessionDetail } from "@/components/section/SessionDetail";
// Import skeleton baru
import { SessionDetailSkeleton } from "@/components/skeleton/SessionDetailSkeleton";

const MyMentoringSessionDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { data: result, isLoading, isError } = useQuery({
    queryKey: ["session-detail", id],
    queryFn: () => MentoringService.getSessionDetails(id),
    enabled: !!id, 
  });

  const session = result?.data; 

  const handleBack = () => {
    navigate("/profile/my-mentoring-sessions");
  };

  const userRole = localStorage.getItem("role");

  const userData = JSON.parse(localStorage.getItem("user"));

  const role = userData?.role;

  console.log("User Role Debug:", userRole);

  // Gunakan Skeleton Component yang baru
  if (isLoading) {
    return <SessionDetailSkeleton />;
  }

  if (isError || !session) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-red-500">Gagal memuat detail sesi.</p>
        <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4"/> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div>
      <SessionDetail session={session} onBack={handleBack} userRole={role} />
    </div>
  );
};

export default MyMentoringSessionDetail;