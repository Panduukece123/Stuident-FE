import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, MessageCircle, Star, User } from "lucide-react";
import * as React from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "react-router";
import courseService from "@/services/CourseService";
import LevelBadge from "@/components/LevelBadge";
import ShareActionButtons from "@/components/shared/ShareActionButtons";
import { formatPrice } from "@/services/Format";
import ProfileService from "@/services/ProfileService";
import { TabCurriculum } from "@/components/section/CourseShow/TabCurriculum";
import { TabOverview } from "@/components/section/CourseShow/TabOverview";
import { TabReview } from "@/components/section/CourseShow/TabReview";
import { Progress } from "@/components/ui/progress";
import { CourseShowPageSkeleton } from "@/components/skeleton/CourseShowPageSkeleton";
import { CheckoutDialog } from "@/components/dialog/CheckoutDialog";
import { PaymentProofDialog } from "@/components/dialog/PaymentProofDialog";
import { useState } from "react";

export default function CourseShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = React.useState({});
  const [profileData, setProfileData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // --- STATE TRANSAKSI ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProofOpen, setIsProofOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  // Kita simpan FULL object data transaksi disini (id, qr_code_url, nominal, dll)
  const [transactionData, setTransactionData] = useState(null);

  const fetchData = React.useCallback(async () => {
    try {
      const courseData = await courseService.showCourse(id);
      setCourse(courseData.data || courseData);
      try {
        const profileRes = await ProfileService.getProfile();
        setProfileData(profileRes.data || profileRes);
      } catch (profileError) {
        console.error("Terdapat error profile:", profileError);
        setProfileData(null);
      }
    } catch (error) {
      console.error("Terdapat error course:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Panggil saat pertama kali load
  React.useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const user = profileData?.user || profileData;
  // console.log(user?.name);

  const userEnrollData = course.enrollments?.find(
    (enrollment) => enrollment.user_id === user?.id
  );

  const calculateRating = () => {
    if (!course.reviews || course.reviews.length === 0)
      return { ratingAverage: 0, ratingTotal: 0 };

    const sum = course.reviews.reduce(
      (total, review) => total + review.rating,
      0
    ); // Review value is always integers (1-5)
    const average = sum / course.reviews.length;

    return {
      ratingAverage: average.toFixed(1),
      ratingTotal: course.reviews.length,
    };
  };
  const { ratingAverage, ratingTotal } = calculateRating();

  const handleBuyClick = () => {
    if (!profileData) {
      alert("Silakan login terlebih dahulu untuk membeli kursus.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleEnrollSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await courseService.enrollCourse(id, paymentMethod);

      const responseData = response.data?.data || response.data;
      const transaction = responseData?.transaction;

      if (transaction?.id) {
        setTransactionData(transaction);
        setIsCheckoutOpen(false);
        setIsProofOpen(true);
      } else {
        console.error("Response structure:", response);
        alert("Gagal mendapatkan ID Transaksi. Silakan cek console.");
      }
    } catch (error) {
      console.error("Error Enroll:", error);

      // --- PERBAIKAN HANDLING ERROR BIAR GAK CRASH ---
      const errorResponse = error.response?.data;

      if (errorResponse) {
        // 1. Cek kalau ada field 'errors' (Validasi Laravel standar)
        if (errorResponse.errors) {
          const firstError = Object.values(errorResponse.errors)[0][0];
          alert(`Gagal Validasi: ${firstError}`);
        }
        // 2. Cek kalau ada field 'pesan' (Format custom backend kamu)
        else if (errorResponse.pesan) {
          alert(`Gagal: ${errorResponse.pesan}`);
        }
        // 3. Cek kalau ada field 'message' (Error umum)
        else if (errorResponse.message) {
          alert(`Gagal: ${errorResponse.message}`);
        } else {
          alert("Terjadi kesalahan pada server.");
        }
      } else {
        alert("Terjadi kesalahan jaringan atau server tidak merespon.");
      }
      // -----------------------------------------------
    } finally {
      setIsProcessing(false);
    }
  };
  const handleUploadProof = async (file) => {
    setIsProcessing(true);
    try {
      // Ambil ID dari object transactionData
      await courseService.uploadPaymentProof(transactionData.id, file);
      alert("Bukti berhasil diunggah!");
      setIsProofOpen(false);
      fetchData(); // Refresh data course (misal jumlah enrolled nambah)
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah bukti.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <CourseShowPageSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto pt-1 p-4 md:py-8 md:px-6 flex flex-col md:flex-row gap-4 md:gap-8">
      <div className="basis-full">
        {/* Legend Page */}
        <div className="w-full flex flex-row gap-4 items-center border-b">
          <Button
            className="rounded-full cursor-pointer hover:opacity-80 transition-all"
            variant="primary"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
            Back
          </Button>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{course.category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem aria-current="page">
                <BreadcrumbPage>{course.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Side Page (Mobile) */}

        {/* Summary Page */}
        <div className="my-4">
          <h1 className="text-2xl md:text-3xl font-semibold w-full">
            {course.title}
          </h1>

          {course.image && (
            <img
              src={course.image}
              alt="Course Thumbnail"
              className="w-full h-48 md:h-64 object-cover rounded-lg my-4"
            />
          )}

          <p className="text-base md:text-lg font-light text-muted-foreground w-full">
            {course.description}
          </p>
          <div className="grid grid-cols-2 mt-4 gap-2">
            <div
              className="inline-flex flex-wrap gap-1"
              id="course_summary_badge"
            >
              <LevelBadge level={course.level} />
              <Badge variant="default">{course.category}</Badge>
              <Badge variant="default">{course.type}</Badge>
            </div>

            <div
              className="inline-flex gap-1 justify-end"
              id="course_summary_participant"
            >
              <User />
              <p id="course_summary_participant-num">
                {course.enrollments?.length || "Belum ada"}
              </p>
              <p className="text-muted-foreground font-light">pendaftar</p>
            </div>

            <div className="inline-flex gap-1" id="course_summary_author">
              <p className="text-muted-foreground font-light">Instruktur:</p>
              <p id="course_summary_author-name">{course.instructor}</p>
            </div>

            <div
              className="inline-flex gap-1 justify-end"
              id="course_summary_review"
            >
              <Star />
              <p id="course_summary_review-num">{ratingAverage}</p>
              <p className="text-muted-foreground font-light">
                dari {ratingTotal} ulasan
              </p>
            </div>
          </div>
        </div>

        {/* Detail Page */}
        <Tabs defaultValue="overview">
          {/* Tabs Selector */}
          <TabsList className={"w-full md:h-12 rounded-b-none border"}>
            <TabsTrigger value="overview">Kilasan</TabsTrigger>
            <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview">
            <TabOverview course={course} />
          </TabsContent>

          <TabsContent value="curriculum">
            <TabCurriculum course={course} />
          </TabsContent>

          <TabsContent value="reviews">
            <TabReview
              course={course}
              user={user}
              onReviewModified={fetchData}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Card className="md:basis-lg h-fit md:sticky md:top-23 max-md:shadow-none">
        <CardContent>
          {course.type === "bootcamp" ? (
            <section className="mb-4 pb-4 border-b">
              <div className="mb-4">
                <p className="text-muted-foreground font-light text-sm italic">
                  *Program Bootcamp dikelola secara melalui WhatsApp. Chat Admin
                  WhatsApp kami untuk informasi lebih lanjut
                </p>
              </div>
              <div className="w-full flex flex-col gap-3">
                {/* WhatsApp Button ala Temen Kamu */}
                <a
                  href="https://wa.me/6285124423755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Chat WhatsApp
                </a>
              </div>
            </section>
          ) : (
            /* LOGIKA UNTUK REGULAR COURSE (ALUR BIASA) */
            <>
              {userEnrollData ? (
                <section className="mb-4 pb-4 border-b">
                  <div className="mb-4">
                    <p className="text-muted-foreground font-light">Progress:</p>
                    <p className="text-2xl">
                      {userEnrollData?.progress
                        ? `${userEnrollData?.progress}%`
                        : "0%"}
                    </p>
                    <Progress value={userEnrollData?.progress || 0} />
                  </div>
                  <div className="w-full flex flex-col gap-2 pt-2 pb-2">
                    <Button variant={"default"} asChild>
                      <Link to={`/my-courses/learn/${course?.id}`}>Belajar</Link>
                    </Button>
                  </div>
                </section>
              ) : (
                <section className="mb-4 pb-4 border-b">
                  <div>
                    <p className="text-muted-foreground font-light">Harga:</p>
                    <p className="text-2xl" id="price">
                      {course?.price <= 0 ? "Gratis" : formatPrice(course.price)}
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2 pt-2 pb-2">
                    <Button variant={"default"} onClick={handleBuyClick}>
                      Beli Sekarang
                    </Button>
                  </div>
                </section>
              )}
            </>
          )}

          <section>
            <p className="text-muted-foreground font-light mb-3">
              Bagikan kursus ini:
            </p>
            <ShareActionButtons
              title={course?.title}
              text={`Check out this course info: ${course?.title}`}
            />
          </section>
        </CardContent>
      </Card>

      {/* DIALOGS */}
      <CheckoutDialog
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        course={course}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handleEnrollSubmit}
        isProcessing={isProcessing}
      />

      <PaymentProofDialog
        open={isProofOpen}
        onOpenChange={setIsProofOpen}
        // PERUBAHAN: Gunakan prop 'transaction' supaya bisa baca QR Code di dalamnya
        transaction={transactionData}
        onUpload={handleUploadProof}
        isProcessing={isProcessing}
      />
    </div>
  );
}
