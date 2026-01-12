import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import scholarshipService from "@/services/ScholarshipService";
import ProfileService from "@/services/ProfileService";
import Swal from "sweetalert2";

// Components
import ScholarshipHeader from "./components/ScholarshipHeader";
import ApplicationStepper from "./components/ApplicationStepper";
import ProfileCard from "./components/ProfileCard";

// Steps
import StepDocuments from "./steps/StepDocuments";
import StepAssessment from "./steps/StepAssessment";
import StepReview from "./steps/StepReview";
import StepSuccess from "./steps/StepSuccess";

const ScholarshipApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [profileCv, setProfileCv] = useState(null); // CV from profile

  // Document states
  const [documents, setDocuments] = useState({
    cv: null,
    transcript: null,
    recommendation: null,
    motivation_letter: null,
  });
  const [motivationMode, setMotivationMode] = useState("file");
  const [motivationText, setMotivationText] = useState("");

  // Assessment form state
  const [assessmentData, setAssessmentData] = useState({
    gpa: "",
    has_other_scholarship: false,
    parent_income: "",
    university: "",
  });

  // File input refs
  const cvInputRef = useRef(null);
  const transcriptInputRef = useRef(null);
  const recommendationInputRef = useRef(null);
  const motivationInputRef = useRef(null);

  // Queries
  const { data: scholarship, isLoading: scholarshipLoading } = useQuery({
    queryKey: ["scholarship-detail", id],
    queryFn: async () => {
      const response = await scholarshipService.getScholarshipById(id);
      return response.data;
    },
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await ProfileService.getMe();
      return response.data || response;
    },
  });

  // Fetch CV from profile
  const { data: cvData, isLoading: cvLoading } = useQuery({
    queryKey: ["profile-cv"],
    queryFn: async () => {
      const response = await ProfileService.getCV();
      return response;
    },
    onSuccess: (data) => {
      if (data?.data?.cv_url) {
        setProfileCv({
          url: data.data.cv_url,
          name: data.data.cv_filename || "CV dari Profil",
          fromProfile: true,
        });
      }
    },
  });

  const { data: applicationDetail, refetch: refetchApplication } = useQuery({
    queryKey: ["application-detail", applicationId],
    queryFn: async () => {
      const response = await scholarshipService.getApplicationDetail(applicationId);
      return response.data;
    },
    enabled: !!applicationId && currentStep >= 3,
  });

  // Check existing application when page loads
  const { data: existingApplication, isLoading: existingAppLoading, isError: existingAppError } = useQuery({
    queryKey: ["existing-application", id],
    queryFn: async () => {
      const response = await scholarshipService.checkExistingApplication(id);
      console.log("Existing Application Response:", response); // Debug
      return response.data; // { application, currentStep }
    },
    retry: false, // Don't retry if 404 (no existing application)
  });

  // Handle existing application data dengan useEffect
  React.useEffect(() => {
    console.log("existingApplication:", existingApplication, "isError:", existingAppError); // Debug
    
    if (existingApplication?.application?.id) {
      setApplicationId(existingApplication.application.id);
      
      // Gunakan currentStep dari backend
      if (existingApplication.currentStep) {
        console.log("Setting currentStep to:", existingApplication.currentStep); // Debug
        setCurrentStep(existingApplication.currentStep);
      }
    } else if (existingAppError) {
      // No existing application, start from step 1
      setCurrentStep(1);
    }
  }, [existingApplication, existingAppError]);

  // Mutations
 const saveDraftMutation = useMutation({
    mutationFn: (formData) => scholarshipService.saveDraft(id, formData),
    onSuccess: (response) => {
      setApplicationId(response.data.id);
      Swal.fire({ 
        icon: "success", 
        title: "Berhasil", 
        text: "Draft berhasil disimpan!", 
        timer: 2000, 
        showConfirmButton: false 
      });
      setCurrentStep(2);
    },
    onError: (error) => {
      // PERBAIKAN DISINI
      console.log("Error Detail:", error.response?.data); // Cek console untuk debug

      // Prioritaskan error.response.data.pesan sesuai format JSON backend Anda
      const errorMessage = 
        error.response?.data?.pesan || 
        error.response?.data?.message || 
        "Terjadi kesalahan inputan / Anda telah mengirim lamaran ini sebelumnya";

      Swal.fire({ 
        icon: "error", 
        title: "Gagal", 
        text: errorMessage 
      }).then(() => {
        // Opsional: Jika errornya karena sudah melamar, mungkin mau redirect user kembali?
        if (errorMessage.toLowerCase().includes("sudah memiliki lamaran")) {
            navigate(`/scholarship/show/${id}`); 
        }
      });
    },
  });

  const updateAssessmentMutation = useMutation({
    mutationFn: (data) => scholarshipService.updateAssessment(applicationId, data),
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Berhasil", text: "Data pre-assessment berhasil disimpan!", timer: 2000, showConfirmButton: false });
      refetchApplication();
      setCurrentStep(3);
    },
    onError: (error) => {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Gagal menyimpan assessment" });
    },
  });

  const submitMutation = useMutation({
    mutationFn: () => scholarshipService.submitApplication(applicationId),
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Berhasil", text: "Lamaran berhasil dikirim!", timer: 2000, showConfirmButton: false });
      setCurrentStep(4);
    },
    onError: (error) => {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Gagal mengirim lamaran" });
    },
  });

  // Handlers
  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prev) => ({
        ...prev,
        [field]: {
          file,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + "mb",
          type: file.name.split(".").pop().toUpperCase(),
        },
      }));
    }
  };

  const handleDeleteDocument = (field) => {
    setDocuments((prev) => ({ ...prev, [field]: null }));
  };

  // Handler untuk menggunakan CV dari profil
  const handleUseProfileCv = () => {
    if (cvData?.data?.cv_url) {
      setDocuments((prev) => ({
        ...prev,
        cv: {
          name: cvData.data.cv_filename || "CV dari Profil",
          size: "-",
          type: "PDF",
          fromProfile: true,
          url: cvData.data.cv_url,
        },
      }));
    }
  };

  const handleSaveDraft = () => {
    if (!documents.cv) {
      Swal.fire({ icon: "warning", title: "Perhatian", text: "CV wajib diupload!" });
      return;
    }

    const formData = new FormData();
    
    // Handle CV - bisa dari file upload atau dari profil
    if (documents.cv?.fromProfile && documents.cv?.url) {
      // CV dari profil - kirim URL
      formData.append("cv_from_profile", "true");
      formData.append("cv_url", documents.cv.url);
    } else if (documents.cv?.file) {
      // CV dari upload file
      formData.append("cv_path", documents.cv.file);
    }
    
    if (documents.transcript?.file) formData.append("transcript_path", documents.transcript.file);
    if (documents.recommendation?.file) formData.append("recommendation_path", documents.recommendation.file);
    
    if (motivationMode === "file" && documents.motivation_letter?.file) {
      formData.append("motivation_letter", documents.motivation_letter.file);
    } else if (motivationMode === "text" && motivationText) {
      formData.append("motivation_letter_text", motivationText);
    }

    saveDraftMutation.mutate(formData);
  };

  const handleUpdateAssessment = () => {
    if (!assessmentData.gpa || !assessmentData.university) {
      Swal.fire({ icon: "warning", title: "Perhatian", text: "GPA dan Universitas wajib diisi!" });
      return;
    }

    updateAssessmentMutation.mutate({
      gpa: parseFloat(assessmentData.gpa),
      has_other_scholarship: assessmentData.has_other_scholarship,
      parent_income: assessmentData.parent_income ? parseInt(assessmentData.parent_income) : null,
      university: assessmentData.university,
    });
  };

  const handleSubmit = () => {
    submitMutation.mutate();
  };

  const handleBack = () => {
    // Always go back to scholarship detail page
    navigate(`/scholarship/show/${id}`);
  };

  // Loading state
  if (scholarshipLoading || profileLoading || existingAppLoading) {
    return (
      <div className="p-10 space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <ScholarshipHeader scholarship={scholarship} />
        <ApplicationStepper currentStep={currentStep} />
        <ProfileCard profile={profile} />

        {/* Step Content */}
        {currentStep === 1 && (
          <StepDocuments
            documents={documents}
            motivationMode={motivationMode}
            motivationText={motivationText}
            setMotivationMode={setMotivationMode}
            setMotivationText={setMotivationText}
            handleDeleteDocument={handleDeleteDocument}
            cvInputRef={cvInputRef}
            transcriptInputRef={transcriptInputRef}
            recommendationInputRef={recommendationInputRef}
            motivationInputRef={motivationInputRef}
            handleFileChange={handleFileChange}
            onReset={() => window.location.reload()}
            onContinue={handleSaveDraft}
            isPending={saveDraftMutation.isPending}
            profileCv={cvData?.data}
            onUseProfileCv={handleUseProfileCv}
          />
        )}

        {currentStep === 2 && (
          <StepAssessment 
            assessmentData={assessmentData} 
            setAssessmentData={setAssessmentData} 
          />
        )}

        {currentStep === 3 && (
          <StepReview applicationDetail={applicationDetail} />
        )}

        {currentStep === 4 && (
          <StepSuccess scholarshipId={id} />
        )}

        {/* Action Buttons - Only for steps 2 and 3 */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="flex justify-between gap-4">
            <Button 
              onClick={handleBack}
              variant="outline"
              className="px-10 py-6 rounded-xl font-bold cursor-pointer"
            >
              Back
            </Button>
            
            {currentStep === 2 && (
              <Button 
                onClick={handleUpdateAssessment}
                disabled={updateAssessmentMutation.isPending}
                className="flex-1 max-w-[240px] py-6 bg-[#3DBDC2] hover:bg-[#34a9ad] rounded-xl text-white font-bold shadow-lg shadow-[#3DBDC2]/20 cursor-pointer"
              >
                {updateAssessmentMutation.isPending ? "Saving..." : "Continue"}
              </Button>
            )}
            
            {currentStep === 3 && (
              <Button 
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="flex-1 max-w-[240px] py-6 bg-[#3DBDC2] hover:bg-[#34a9ad] rounded-xl text-white font-bold shadow-lg shadow-[#3DBDC2]/20 cursor-pointer"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipApplicationPage;
