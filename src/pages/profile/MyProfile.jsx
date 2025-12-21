import React, { useState, useRef } from "react"; // Tambah useRef
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Tambah useMutation
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  SquareArrowOutUpRight,
  Trash,
  Upload,
  Loader2,
  FileText,
  Briefcase,
  Award,
  ArrowRight,
} from "lucide-react"; // Tambah Icon
import ProfileService from "@/services/ProfileService";

// IMPORT SEMUA DIALOG
import { EditBioDialog } from "@/components/EditBioDialog";
import { EditEducationDialog } from "@/components/EditEduDialog";
import { EditPersonalDialog } from "@/components/EditPersonalDialog";
import { ExperienceDialog } from "@/components/ExperienceDialog";
import { AchievementDialog } from "@/components/AchievementDialog";
import { EditSpecializationDialog } from "@/components/EditSpecializationDialog";
import { Link } from "react-router";

export const MyProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // Ref untuk input file CV
  const cvInputRef = useRef(null);

  // --- STATE UNTUK DIALOG ---
  const [openBio, setOpenBio] = useState(false);
  const [openEdu, setOpenEdu] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(false);

  const [openExp, setOpenExp] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const [openAch, setOpenAch] = useState(false);
  const [selectedAch, setSelectedAch] = useState(null);

  const [openSpec, setOpenSpec] = useState(false);

  // --- FETCH DATA ---
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", token],
    queryFn: async () => {
      const result = await ProfileService.getProfile();
      return result.data || result;
    },
    staleTime: 1000 * 60 * 5,
  });

  // --- MUTATION UPLOAD CV ---
  const uploadCvMutation = useMutation({
    mutationFn: (file) => ProfileService.uploadCv(file),
    onSuccess: () => {
      // Refresh data profil setelah sukses upload
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("CV berhasil diunggah!");
    },
    onError: (error) => {
      console.error(error);
      alert("Gagal mengunggah CV. Pastikan format PDF dan ukuran sesuai.");
    },
  });

  // --- HANDLER UPLOAD CV ---
  const handleCvClick = () => {
    cvInputRef.current.click();
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi sederhana (opsional)
    if (file.type !== "application/pdf") {
      alert("Harap unggah file PDF.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      alert("Ukuran file maksimal 2MB.");
      return;
    }

    uploadCvMutation.mutate(file);
    e.target.value = null; // Reset input
  };

  // --- HELPER LAINNYA ---
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const handleAddExp = () => {
    setSelectedExp(null);
    setOpenExp(true);
  };
  const handleEditExp = (exp) => {
    setSelectedExp(exp);
    setOpenExp(true);
  };
  const handleAddAch = () => {
    setSelectedAch(null);
    setOpenAch(true);
  };
  const handleEditAch = (ach) => {
    setSelectedAch(ach);
    setOpenAch(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getFileName = (url) => {
    if (!url) return "unknown_file.pdf";
    return url.split("/").pop();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">Gagal memuat profil.</div>
    );
  }

  const { user, achievements, experiences } = profileData || {};
  const isCvUploading = uploadCvMutation.isPending;

  // Logic Specialization
  const rawSpec = user?.specialization;
  let specializationArray = [];
  if (Array.isArray(rawSpec)) {
    specializationArray = rawSpec;
  } else if (typeof rawSpec === "string") {
    specializationArray = rawSpec.split(",").map((item) => item.trim());
  } else {
    specializationArray = [];
  }

  // --- HELPER UNTUK URL SERTIFIKAT ---
  const getCertificateUrl = (path) => {
    if (!path) return "#";

    // 1. Kalau link eksternal (https://google.com...), biarkan
    if (path.startsWith("http")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;

    return `http://localhost:8000/storage/${cleanPath}`;
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Profile</h1>
      </div>

      <div className="w-full flex flex-row gap-6">
        <div className="w-3/5 flex flex-col gap-4">
          {/* --- BIOGRAPHY --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Biography</h2>
            <Button
              variant="outline"
              className={"rounded-full"}
              onClick={() => setOpenBio(true)}
            >
              <Edit /> Edit
            </Button>
            <EditBioDialog
              open={openBio}
              onOpenChange={setOpenBio}
              initialData={user?.bio}
              onSuccess={handleRefresh}
            />
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl">
            <p className="font-light whitespace-pre-line">
              {user?.bio || "User belum mengisi biodata."}
            </p>
          </div>

          {/* --- EDUCATION --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Education</h2>
            <Button
              variant="outline"
              className={"rounded-full"}
              onClick={() => setOpenEdu(true)}
            >
              <Edit /> Edit
            </Button>
            <EditEducationDialog
              open={openEdu}
              onOpenChange={setOpenEdu}
              initialData={user}
              onSuccess={handleRefresh}
            />
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">{user?.institution || "-"}</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-24">Major</span>
                <span className="mr-2">:</span>
                <span className="font-light">{user?.major || "-"}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Degree</span>
                <span className="mr-2">:</span>
                <span className="font-light">
                  {user?.education_level || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* --- EXPERIENCE --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Experience</h2>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleAddExp}
            >
              <Edit className="mr-2 h-4 w-4" /> Add New
            </Button>
            <ExperienceDialog
              open={openExp}
              onOpenChange={setOpenExp}
              initialData={selectedExp}
              onSuccess={handleRefresh}
            />
          </div>
          {experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium">{exp.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditExp(exp)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Briefcase className="w-3 h-3" /> {exp.company} •{" "}
                    {exp.level}
                  </div>
                </div>
                <p className="text-sm text-neutral-600">{exp.description}</p>
                <div className="flex flex-col gap-1 mt-2 text-sm">
                  <div className="flex items-center capitalize">
                    <span className="w-20 font-medium">Type</span>: {exp.type}
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 font-medium">Date</span>:{" "}
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                  </div>
                </div>
                {exp.certificate_url && (
                  <Button
                    variant="link"
                    className="w-fit px-0 ml-auto"
                    onClick={() =>
                      window.open(
                        getCertificateUrl(exp.certificate_url),
                        "_blank"
                      )
                    }
                  >
                    See Certificate
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">
              No experience added yet.
            </div>
          )}

          {/* --- ACHIEVEMENT --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Achievement</h2>
            <Button
              variant="outline"
              className={"rounded-full"}
              onClick={handleAddAch}
            >
              <Edit className="mr-2 h-4 w-4" /> Add New
            </Button>
            <AchievementDialog
              open={openAch}
              onOpenChange={setOpenAch}
              initialData={selectedAch}
              onSuccess={handleRefresh}
            />
          </div>
          {achievements && achievements.length > 0 ? (
            achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">{ach.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditAch(ach)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Award className="w-3 h-3" /> {ach.organization} ({ach.year}
                    )
                  </div>
                </div>
                <p className="text-sm text-neutral-600">{ach.description}</p>
                {ach.certificate_url && (
                  <Button
                    variant="link"
                    className="w-fit px-0 ml-auto"
                    onClick={() =>
                      window.open(
                        getCertificateUrl(ach.certificate_url),
                        "_blank"
                      )
                    }
                  >
                    See Certificate
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">
              No achievements yet.
            </div>
          )}

          {/* --- SPECIALIZATION --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Specialization</h2>
            <Button
              variant="outline"
              className={"rounded-full"}
              onClick={() => setOpenSpec(true)}
            >
              <Edit /> Edit
            </Button>
            <EditSpecializationDialog
              open={openSpec}
              onOpenChange={setOpenSpec}
              initialData={specializationArray}
              onSuccess={handleRefresh}
            />
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-wrap gap-2">
            {specializationArray.length > 0 ? (
              specializationArray.map((item, index) => (
                <Badge key={index} className="bg-primary hover:bg-primary/90">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-neutral-500 text-center w-full italic">
                Belum ada spesialisasi.
              </span>
            )}
          </div>

          {/* --- ATTACHMENT (CV SECTION) --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Curriculum Vitae</h2>
          </div>

          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-4">
            {/* 1. CURRICULUM VITAE */}
            <div className="flex flex-col gap-2">
              {/* Input File Hidden */}
              <input
                type="file"
                ref={cvInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleCvChange}
              />

              {user?.cv || user?.cv_path ? ( // Cek apakah CV sudah ada di DB
                <div className="flex flex-col gap-2">
                  {/* File Card */}
                  <div className="bg-neutral-50 p-3 border border-neutral-200 rounded-xl flex flex-row justify-between items-center group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg text-red-600">
                        <FileText size={24} />
                      </div>
                      <div>
                        <span className="font-medium text-sm block truncate max-w-[200px]">
                          {/* Tampilkan nama file dari URL atau fallback */}
                          {getFileName(user.cv || user.cv_path)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          PDF Document
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        window.open(user.cv || user.cv_path, "_blank")
                      }
                      title="Lihat CV"
                    >
                      <SquareArrowOutUpRight className="w-5 h-5 text-neutral-500" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit rounded-full border-primary/20 text-primary hover:bg-primary/5"
                      onClick={handleCvClick}
                      disabled={isCvUploading}
                    >
                      {isCvUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Edit className="mr-2 h-4 w-4" />
                      )}
                      {isCvUploading ? "Uploading..." : "Ganti File"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm text-muted-foreground">
                    Belum ada CV yang diunggah
                  </p>
                  <Button onClick={handleCvClick} disabled={isCvUploading}>
                    {isCvUploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {isCvUploading ? "Uploading..." : "Upload CV"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="w-2/5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-neutral-300 w-full p-4 h-fit flex flex-col gap-2">
            {/* ... Sidebar content (Personal Info) tetap sama ... */}
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl">Profile</h2>
              <Button
                variant="outline"
                className={"rounded-full"}
                onClick={() => setOpenPersonal(true)}
              >
                <Edit /> Edit
              </Button>
              <EditPersonalDialog
                open={openPersonal}
                onOpenChange={setOpenPersonal}
                initialData={user}
                onSuccess={handleRefresh}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-24 font-medium">Nama</span>
                <span className="mr-2">:</span>
                <span className="font-light">{user?.name || "-"}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium">Gender</span>
                <span className="mr-2">:</span>
                <span className="font-light capitalize">
                  {user?.gender || "-"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium">Birth Date</span>
                <span className="mr-2">:</span>
                <span className="font-light">
                  {formatDate(user?.birth_date)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium">Phone</span>
                <span className="mr-2">:</span>
                <span className="font-light">{user?.phone || "-"}</span>
              </div>
              <div className="flex items-start">
                <span className="w-24 font-medium shrink-0">Address</span>
                <span className="mr-2 shrink-0">:</span>
                <span className="font-light wrap-break-word flex-1">
                  {user?.address || "-"}
                </span>
              </div>
            </div>
          </div>
          <Link to="portfolio">
            <div className="flex flex-row justify-between bg-white items-center rounded-2xl p-4 border border-neutral-300">
              <h2 className="text-2xl">My Portfolio</h2>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
          <div className="bg-white rounded-2xl border border-neutral-300 w-full p-4 h-fit flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl">Link</h2>
              <Button variant="outline" className={"rounded-full"}>
                <Edit /> Edit
              </Button>
            </div>
            <div className="flex flex-col gap-1 text-primary underline">
              <a href="#">Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
