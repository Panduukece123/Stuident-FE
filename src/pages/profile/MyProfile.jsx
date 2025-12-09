import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  SquareArrowOutUpRight,
  Trash,
  Loader2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ProfileService from "@/services/ProfileService";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ProfileService.getProfile();
        // Handle laravel response wrapper
        setProfileData(result.data || result);
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { user, achievements, experiences } = profileData || {};

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Profile</h1>
      </div>

      <div className="w-full flex flex-row gap-6">
        <div className="w-3/5 flex flex-col gap-4">
          
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Biography</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl">
            <p className="font-light whitespace-pre-line">
              {user?.bio || "User belum mengisi biodata."}
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Education</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
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

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Experience</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          
          {experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2">
                <h3 className="text-xl">{exp.title}</h3>
                <p className="font-light text-sm text-neutral-600">
                  {exp.description}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light capitalize">{exp.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Level</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">{exp.level}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Company</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">{exp.company}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Date</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">
                      {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Present"}
                    </span>
                  </div>
                  {exp.certificate_url && (
                    <Button variant="link" className="w-fit px-0 ml-auto" onClick={() => window.open(exp.certificate_url, '_blank')}>
                      See Certificate
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">
              No experience added yet.
            </div>
          )}

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Achievement</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          
          {achievements && achievements.length > 0 ? (
            achievements.map((ach) => (
              <div key={ach.id} className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2 mb-2">
                <h3 className="text-xl">{ach.title}</h3>
                <p className="font-light text-sm text-neutral-600">
                  {ach.description}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Org</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">{ach.organization}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Year</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">{ach.year}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="bg-white p-4 border border-neutral-300 rounded-xl text-center text-neutral-500 italic">
              No achievements yet.
            </div>
          )}

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Specialization</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-wrap gap-2">
            <Badge> Web Development </Badge>
            <Badge> Data Science </Badge>
            <Badge> Mobile Development </Badge>
            <Badge> UI/UX Design </Badge>
            <Badge> Cybersecurity </Badge>
            <Badge> Cloud Computing </Badge>
            <Badge> Artificial Intelligence </Badge>
            <Badge> DevOps </Badge>
          </div>

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Attachment</h2>
          </div>
          <div className="bg-white p-4 border border-neutral-300 rounded-xl flex flex-col gap-2">
            
            <h3 className="text-xl">Curriculum Vitae</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">cv_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit /> Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash /> Remove
              </Button>
            </div>

            <h3 className="text-xl">Portfolio</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">portfolio_bima_adnadnita.pdf</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit /> Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash /> Remove
              </Button>
            </div>

            <h3 className="text-xl">Recommendation Letter</h3>
            <div className="bg-neutral-200 p-3 border border-neutral-300 rounded-xl flex flex-row justify-between items-center ">
              <div>
                <span className="font-light">
                  recommendation_bima_adnadnita.pdf
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="w-24">Size</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">2 MB</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Type</span>
                    <span className="mr-2">:</span>
                    <span className="font-light">PDF</span>
                  </div>
                </div>
              </div>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="w-fit px-0 rounded-full">
                <Edit /> Change
              </Button>
              <Button
                variant="outline"
                className="w-fit px-0 border-red-500 text-red-500 rounded-full"
              >
                <Trash /> Remove
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-300 w-2/5 p-4 h-fit flex flex-col gap-2">
          
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Profile</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
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
              <span className="font-light capitalize">{user?.gender || "-"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Birth Date</span>
              <span className="mr-2">:</span>
              <span className="font-light">{formatDate(user?.birth_date)}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Phone</span>
              <span className="mr-2">:</span>
              <span className="font-light">{user?.phone || "-"}</span>
            </div>
            <div className="flex items-start">
              <span className="w-24 font-medium shrink-0">Address</span>
              <span className="mr-2 shrink-0">:</span>
              <span className="font-light wrap-break-word flex-1">{user?.address || "-"}</span>
            </div>
          </div>

          <div className="my-2 h-px w-full bg-neutral-200" />

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Education</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <span className="w-24 font-medium">Institution</span>
              <span className="mr-2">:</span>
              <span className="font-light">{user?.institution || "-"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Major</span>
              <span className="mr-2">:</span>
              <span className="font-light">{user?.major || "-"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Degree</span>
              <span className="mr-2">:</span>
              <span className="font-light">{user?.education_level || "-"}</span>
            </div>
          </div>

          <div className="my-2 h-px w-full bg-neutral-200" />

          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Link</h2>
            <Button variant="outline" className={"rounded-full"}>
              <Edit /> Edit
            </Button>
          </div>
          <div className="flex flex-col gap-1 text-primary underline">
            <a href="https://github.com/rinakartika">Github</a>
            <a href="https://linkedin.com/in/rinakartika">LinkedIn</a>
            <a href="https://portfolio.rinakartika.com">Portfolio</a>
            <a href="https://twitter.com/rinakartika">Twitter</a>
            <a href="https://instagram.com/rinakartika">Instagram</a>
          </div>

        </div>
      </div>
    </div>
  );
};