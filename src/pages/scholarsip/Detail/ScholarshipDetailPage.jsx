import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Share2,
  Flag,
  Calendar,
  Bookmark,
  CheckCircle2,
  Copy,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import scholarshipService from "@/services/ScholarshipService";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ShareActionButtons from "@/components/shared/ShareActionButtons";

const ScholarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const { data: data = [], isLoading } = useQuery({
    queryKey: ["scholarship-detail", id],
    queryFn: async () => {
      const response = await scholarshipService.getScholarshipById(id);
      if (!response.sukses) {
        throw new Error("Failed to fetch scholarship detail");
      }
      return response.data;
    },
    placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="bg-gray-50/50 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-6 w-64" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
             
              <Skeleton className="w-full h-[300px] md:h-[400px] rounded-xl" />

            
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-24 h-24 rounded-full shrink-0" /> {/* Logo */}
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-10 w-3/4" /> {/* Title */}
                  <Skeleton className="h-4 w-full" /> {/* Desc line 1 */}
                  <Skeleton className="h-4 w-5/6" /> {/* Desc line 2 */}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            {/* --- RIGHT COLUMN SKELETON --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Action Card Skeleton */}
                <div className="border rounded-xl p-6 bg-white space-y-4">
                  <Skeleton className="h-6 w-1/2 mx-auto mb-4" /> {/* Deadline Text */}
                  <Skeleton className="h-12 w-full rounded-lg" /> {/* Register Button */}
                  <Skeleton className="h-12 w-full rounded-lg" /> {/* Keep Button */}
                  <div className="pt-4 border-t mt-4 flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!data)
    return (
      <div className="p-20 text-center text-red-500">Data tidak ditemukan</div>
    );

  const { organization } = data;

  const formattedDeadline = new Date(data.deadline).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const createdAt = new Date(data.created_at);
  const formattedCreatedAt = createdAt.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-row gap-4 items-center">
          <Button
            className="rounded-full cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
            Back
          </Button>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/scholarship">Scholarships</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link to={`/scholarship/show/${data.id}`}>{data.name}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden shadow-sm border bg-white">
            {data.image_url ? (
              <img
                src={data.image_url}
                alt={data.name}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Header Info Section (Logo, Title, Metadata) */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo Organization */}
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border bg-white p-4 shadow-sm flex items-center justify-center overflow-hidden">
                {organization?.logo_full_url ? (
                  <img
                    src={organization.logo_full_url}
                    alt={organization.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building2 className="text-gray-300 w-12 h-12" />
                )}
              </div>
            </div>

            {/* Title & Meta Grid */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {data.name}
                </h1>
                <p className="text-gray-500 mt-2 text-lg leading-relaxed">
                  {data.description?.substring(0, 100)}
                  {data.description && data.description.length > 100
                    ? "..."
                    : ""}
                </p>
              </div>

              {/*Organizer, Location, Benefits */}
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm md:text-base mt-4">
            <span className="text-gray-500 font-medium">Organizer</span>
            <span className="font-semibold text-gray-900">
              {organization?.name || "Unknown"}
            </span>

            <span className="text-gray-500 font-medium">Location</span>
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <MapPin className="w-4 h-4 text-gray-400" />
              {data.location}
            </div>

            <span className="text-gray-500 font-medium">Benefits</span>
            <span className="font-semibold text-green-600">{data.benefit}</span>

            <span className="text-gray-500 font-medium">Field</span>
            <span className="font-semibold text-gray-900">
              {data.study_field}
            </span>

            <span className="text-gray-500 font-medium">Status</span>
            <div className="flex justify-between items-center ">
              <Badge
                variant={data.status === "open" ? "default" : "secondary"}
                className="capitalize"
              >
                {data.status}
              </Badge>

              <div className="flex flex-col items-end">
                <span className="text-gray-500 font-medium">Posted On</span>
                <span className="font-semibold text-gray-900">
                  {formattedCreatedAt}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Full Description  */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Description</h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {data.description}
            </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 mt-8">
            <h3 className="font-semibold text-blue-900 mb-2">
              About {organization?.name}
            </h3>
            <p className="text-sm text-blue-800/80">
              {organization?.description || "No description available."}
            </p>
          </div>
        </div>

        {/* --- Kanan Sidebar --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Action Card */}
            <Card className="shadow-lg border-none ring-1 ring-gray-100">
              <CardContent className="p-6 space-y-4">
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-lg font-bold flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" /> {formattedDeadline}
                  </p>
                </div>
                
                <Button className="w-full h-12 text-lg bg-[#3DBDC2] hover:bg-[#2da8ad] text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer">
                  {isLoggedIn ? (
                    <Link to={`/scholarship/application/${data.id}`}>
                      Register Now
                    </Link>
                  ) : (
                    <Link to="/login">
                      Login to Register
                    </Link>
                  )}
                </Button>
               


                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">
                    Share this scholarship:
                  </p>
                  <ShareActionButtons 
                    title={data?.name} 
                    text={`Check out this scholarship info: ${data?.name}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Report */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-3">
                Fraudulent scholarship? Report it here:
              </p>
              <Button
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600 text-white gap-2  cursor-pointer"
              >
                <Flag size={18} /> Report
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScholarshipDetail;
