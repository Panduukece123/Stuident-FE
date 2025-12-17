import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // <--- 1. Import TanStack
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, SquareArrowOutUpRight, Trash } from "lucide-react";
import ProfileService from "@/services/ProfileService";

// IMPORT SEMUA DIALOG
import { EditBioDialog } from "@/components/EditBioDialog";
import { EditEducationDialog } from "@/components/EditEduDialog";
import { EditPersonalDialog } from "@/components/EditPersonalDialog";
import { ExperienceDialog } from "@/components/ExperienceDialog";
import { AchievementDialog } from "@/components/AchievementDialog";
import { EditSpecializationDialog } from "@/components/EditSpecializationDialog";

export const MyProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // --- STATE UNTUK DIALOG (Tetap pakai useState) ---
  const [openBio, setOpenBio] = useState(false);
  const [openEdu, setOpenEdu] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(false);
  
  const [openExp, setOpenExp] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const [openAch, setOpenAch] = useState(false);
  const [selectedAch, setSelectedAch] = useState(null);

  const [openSpec, setOpenSpec] = useState(false);

  // --- 3. FETCH DATA DENGAN TANSTACK QUERY ---
  const { 
    data: profileData, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["profile", token], // Key unik
    queryFn: async () => {
      const result = await ProfileService.getProfile();
      return result.data || result; // Handle wrapper data
    },
    // Data dianggap "fresh" selama 5 menit (optional)
    staleTime: 1000 * 60 * 5, 
  });

  // --- 4. FUNGSI REFRESH (Dipanggil setelah Edit/Simpan) ---
  const handleRefresh = () => {
    // Memberitahu React Query bahwa data 'profile' sudah basi, 
    // jadi tolong ambil ulang di background.
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  // --- HANDLERS (Sama seperti sebelumnya) ---
  const handleAddExp = () => { setSelectedExp(null); setOpenExp(true); };
  const handleEditExp = (exp) => { setSelectedExp(exp); setOpenExp(true); };
  
  const handleAddAch = () => { setSelectedAch(null); setOpenAch(true); };
  const handleEditAch = (ach) => { setSelectedAch(ach); setOpenAch(true); };

  // --- HELPER DATE ---
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  // --- 5. LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center p-10 text-red-500">Gagal memuat profil.</div>;
  }

  // --- 6. DATA PROCESSING (Jalan setelah loading selesai) ---
  const { user, achievements, experiences } = profileData || {};

  // Logic Specialization (Robust)
  const rawSpec = user?.specialization;
  let specializationArray = [];

  if (Array.isArray(rawSpec)) {
    specializationArray = rawSpec;
  } else if (typeof rawSpec === 'string') {
    specializationArray = rawSpec.split(',').map(item => item.trim());
  } else {
    specializationArray = [];
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Profile</h1>
      </div>

      <div className="w-full flex flex-row gap-6">
        <div className="w-3/5 flex flex-col gap-4">
          
          {/* --- BIOGRAPHY --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Biography</h2>
            <Button variant="outline" className={"rounded-full"} onClick={() => setOpenBio(true)}>
              <Edit /> Edit
            </Button>
            {/* Perhatikan props onSuccess diganti jadi handleRefresh */}
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
            <Button variant="outline" className={"rounded-full"} onClick={() => setOpenEdu(true)}>
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
                <span className="font-light">{user?.education_level || "-"}</span>
              </div>
            </div>
          </div>

          {/* --- EXPERIENCE --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Experience</h2>
            <Button variant="outline" className="rounded-full" onClick={handleAddExp}>
              <Edit className="mr-2 h-4 w-4" /> Add New
            </Button>
            <ExperienceDialog
              open={openExp}
              onOpenChange={setOpenExp}
              initialData={selectedExp}
              onSuccess={handleRefresh}
            />
          </div>
          
          {/* List Experience */}
          {experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2">
                <div className="flex flex-row justify-between items-start">
                  <h3 className="text-xl">{exp.title}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500" onClick={() => handleEditExp(exp)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <p className="font-light text-sm text-neutral-600">{exp.description}</p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Type</span><span className="mr-2">:</span><span className="font-light capitalize">{exp.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Date</span><span className="mr-2">:</span>
                    <span className="font-light">{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</span>
                  </div>
                  {exp.certificate_url && (
                    <Button variant="link" className="w-fit px-0 ml-auto" onClick={() => window.open(exp.certificate_url, '_blank')}>See Certificate</Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">No experience added yet.</div>
          )}

          {/* --- ACHIEVEMENT --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Achievement</h2>
            <Button variant="outline" className={"rounded-full"} onClick={handleAddAch}>
              <Edit className="mr-2 h-4 w-4" /> Add New
            </Button>
            <AchievementDialog
              open={openAch}
              onOpenChange={setOpenAch}
              initialData={selectedAch}
              onSuccess={handleRefresh}
            />
          </div>
          
          {/* List Achievement */}
          {achievements && achievements.length > 0 ? (
            achievements.map((ach) => (
              <div key={ach.id} className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2">
                <div className="flex flex-row justify-between items-start">
                    <h3 className="text-xl">{ach.title}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500" onClick={() => handleEditAch(ach)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
                <p className="font-light text-sm text-neutral-600">{ach.description}</p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Org</span><span className="mr-2">:</span><span className="font-light">{ach.organization}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Year</span><span className="mr-2">:</span><span className="font-light">{ach.year}</span>
                  </div>
                  {ach.certificate_url && (
                    <Button variant="link" className="w-fit px-0 ml-auto" onClick={() => window.open(ach.certificate_url, '_blank')}>See Certificate</Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">No achievements yet.</div>
          )}

          {/* --- SPECIALIZATION --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Specialization</h2>
            <Button variant="outline" className={"rounded-full"} onClick={() => setOpenSpec(true)}>
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
                <Badge key={index} className="bg-primary hover:bg-primary/90">{item}</Badge>
              ))
            ) : (
              <span className="text-neutral-500 italic text-sm">Belum ada spesialisasi.</span>
            )}
          </div>

          {/* --- ATTACHMENT --- */}
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Attachment</h2>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            <h3 className="text-xl">Curriculum Vitae</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">cv_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center"><span className="w-24">Size</span><span className="mr-2">:</span><span className="font-light">2 MB</span></div>
                  <div className="flex items-center"><span className="w-24">Type</span><span className="mr-2">:</span><span className="font-light">PDF</span></div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full"><Edit /> Change</Button>
              <Button variant="outline" className="w-fit px-0 border-red-500 text-red-500 rounded-full"><Trash /> Remove</Button>
            </div>
            
            <h3 className="text-xl">Portfolio</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">portfolio_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center"><span className="w-24">Size</span><span className="mr-2">:</span><span className="font-light">2 MB</span></div>
                  <div className="flex items-center"><span className="w-24">Type</span><span className="mr-2">:</span><span className="font-light">PDF</span></div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full"><Edit /> Change</Button>
              <Button variant="outline" className="w-fit px-0 border-red-500 text-red-500 rounded-full"><Trash /> Remove</Button>
            </div>

            <h3 className="text-xl">Recommendation Letter</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">recommendation_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center"><span className="w-24">Size</span><span className="mr-2">:</span><span className="font-light">2 MB</span></div>
                  <div className="flex items-center"><span className="w-24">Type</span><span className="mr-2">:</span><span className="font-light">PDF</span></div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full"><Edit /> Change</Button>
              <Button variant="outline" className="w-fit px-0 border-red-500 text-red-500 rounded-full"><Trash /> Remove</Button>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="bg-white rounded-2xl border border-neutral-300 w-2/5 p-4 h-fit flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Profile</h2>
            <Button variant="outline" className={"rounded-full"} onClick={() => setOpenPersonal(true)}>
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
            <div className="flex items-center"><span className="w-24 font-medium">Nama</span><span className="mr-2">:</span><span className="font-light">{user?.name || "-"}</span></div>
            <div className="flex items-center"><span className="w-24 font-medium">Gender</span><span className="mr-2">:</span><span className="font-light capitalize">{user?.gender || "-"}</span></div>
            <div className="flex items-center"><span className="w-24 font-medium">Birth Date</span><span className="mr-2">:</span><span className="font-light">{formatDate(user?.birth_date)}</span></div>
            <div className="flex items-center"><span className="w-24 font-medium">Phone</span><span className="mr-2">:</span><span className="font-light">{user?.phone || "-"}</span></div>
            <div className="flex items-start"><span className="w-24 font-medium shrink-0">Address</span><span className="mr-2 shrink-0">:</span><span className="font-light wrap-break-word flex-1">{user?.address || "-"}</span></div>
          </div>

          <div className="my-2 h-px w-full bg-neutral-200" />

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Link</h2>
            <Button variant="outline" className={"rounded-full"}><Edit /> Edit</Button>
          </div>
          <div className="flex flex-col gap-1 text-primary underline">
            <a href="https://github.com/rinakartika">Github</a>
          </div>
        </div>
      </div>
    </div>
  );
};