import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

// IMPORT COMPONENTS
import { ElearningBanner } from "../components/section/ElearningBanner";
import { ElearningCategories } from "../components/section/ElearningCategories";
import { ElearningCourseList } from "../components/section/ElearningCourseList";
import { ElearningList } from "@/components/section/ElearningList";
import { InfoBootcamp } from "@/components/section/InfoBootcampSection";
import { ElearningBootcampList } from "@/components/section/ElearningBootcampList";
import { ElearningEnrolledList } from "@/components/section/ElearningEnrolledList";
import { BookOpen } from "lucide-react";
import { ElearningPageSkeleton } from "@/components/skeleton/ElearningPageSkeleton";
import { InfoSubscription } from "@/components/section/InfoSubscription";
import { UpgradeSubscriptionDialog } from "@/components/dialog/UpgradeSubsDialog";

// IMPORT SERVICES
import ElearningService from "@/services/elearningService";
import ProfileService from "@/services/ProfileService";
import { subscriptionService } from "@/services/SubscriptionService";

export const ElearningPage = () => {
  // --- SETUP SCROLL LOGIC ---
  const { hash } = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!localStorage.getItem("token");

  // --- CONFIG PAGINATION (SATU BARIS = 4 ITEM) ---
  const ITEMS_PER_ROW = 4;

  // State Pagination
  const [enrolledPage, setEnrolledPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);   // Discovery
  const [popularPage, setPopularPage] = useState(1);   // Popular (Regular Course)
  const [bootcampPage, setBootcampPage] = useState(1); // Bootcamp

  // --- LOGIC SUBSCRIPTION ---
  const [subscriptions, setSubscriptions] = useState([]);
  const [subsLoading, setSubsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetPlan, setTargetPlan] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Fetch Subscription Data
  const fetchSubscriptions = async () => {
    try {
      setSubsLoading(true);
      const response = await subscriptionService.getMySubscriptions();
      if (response.sukses) {
        setSubscriptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setSubsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handlePlanClick = (selectedPlan) => {
    setTargetPlan(selectedPlan);
    setIsDialogOpen(true);
  };

  const handleConfirmUpgrade = async (selectedPaymentMethod) => {
    const activeSub = subscriptions.find((sub) => sub.status === "active");
    const activeId = activeSub ? activeSub.id : null;

    if (!activeId) {
      alert("Tidak ditemukan paket aktif untuk di-upgrade.");
      return;
    }

    try {
      setIsUpgrading(true);
      const payload = {
        plan: targetPlan,
        payment_method: selectedPaymentMethod,
      };

      await subscriptionService.upgradeSubscription(activeId, payload);
      setIsDialogOpen(false);
      alert(`Berhasil upgrade ke ${targetPlan}!`);
      fetchSubscriptions();
    } catch (error) {
      console.error("Upgrade failed:", error);
      const errMsg =
        error.response?.data?.message ||
        "Gagal melakukan upgrade subscription.";
      alert(errMsg);
    } finally {
      setIsUpgrading(false);
    }
  };
  // --- END LOGIC SUBSCRIPTION ---

  // --- QUERY DATA ---
  const {
    data: courses = [],
    isLoading: loadingCourses,
    isError: isCoursesError,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: ElearningService.fetchCourses,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recData, isLoading: loadingRecs } = useQuery({
    queryKey: ["recommendations", token],
    queryFn: ProfileService.getRecommendations,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });

  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ["enrolled-courses", token],
    queryFn: async () => {
      if (!isLoggedIn) return [];
      try {
        const res = await ProfileService.getEnrolledCourses();
        return Array.isArray(res) ? res : res.data || [];
      } catch (err) {
        return [];
      }
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 2,
  });

  // Effect Scroll to Hash
  useEffect(() => {
    if (!loadingCourses && hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [loadingCourses, hash]);


  // --- LOGIC DATA SOURCE, FILTERING & SLICING (UPDATED) ---

  // 1. FILTER DULU (Pisahkan Course Biasa dan Bootcamp)
  // Pastikan properti 'type' sesuai dengan response API (case-sensitive)
  const allRegularCourses = courses.filter((c) => c.type === 'course');
  const allBootcamps = courses.filter((c) => c.type === 'bootcamp');

  // 2. Enrolled Courses Slicing
  const idxLastEnrolled = enrolledPage * ITEMS_PER_ROW;
  const idxFirstEnrolled = idxLastEnrolled - ITEMS_PER_ROW;
  const currentEnrolledCourses = enrolledCourses.slice(idxFirstEnrolled, idxLastEnrolled);
  const totalEnrolledPages = Math.ceil(enrolledCourses.length / ITEMS_PER_ROW);

  // 3. Discovery / Recommendations Slicing
  // (Discovery biasanya menampilkan campuran, jadi kita pakai logic source awal)
  const recommendedCourses = Array.isArray(recData?.data) ? recData.data : [];
  const discoverySource = isLoggedIn && recommendedCourses.length > 0 ? recommendedCourses : courses;
  
  const idxLastDiscovery = currentPage * ITEMS_PER_ROW;
  const idxFirstDiscovery = idxLastDiscovery - ITEMS_PER_ROW;
  const currentDiscoveryCourses = discoverySource.slice(idxFirstDiscovery, idxLastDiscovery);
  const totalDiscoveryPages = Math.ceil(discoverySource.length / ITEMS_PER_ROW);

  // 4. Popular Courses Slicing (PAKE DATA HASIL FILTER: allRegularCourses)
  const idxLastPop = popularPage * ITEMS_PER_ROW;
  const idxFirstPop = idxLastPop - ITEMS_PER_ROW;
  const currentPopularCourses = allRegularCourses.slice(idxFirstPop, idxLastPop);
  const totalPopularPages = Math.ceil(allRegularCourses.length / ITEMS_PER_ROW);

  // 5. Bootcamp Courses Slicing (PAKE DATA HASIL FILTER: allBootcamps)
  const idxLastBoot = bootcampPage * ITEMS_PER_ROW;
  const idxFirstBoot = idxLastBoot - ITEMS_PER_ROW;
  const currentBootcampCourses = allBootcamps.slice(idxFirstBoot, idxLastBoot);
  const totalBootcampPages = Math.ceil(allBootcamps.length / ITEMS_PER_ROW);

  // Get Unique Categories for Filter UI
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  if (loadingCourses || (isLoggedIn && loadingRecs)) {
    return <ElearningPageSkeleton />;
  }

  if (isCoursesError) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-500 font-medium">
          {coursesError?.message || "Gagal memuat katalog kursus."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // Komponen Pagination Helper
  const PaginationControl = ({ page, total, onPageChange }) => {
    if (total <= 1) return null;
    return (
      <div className="container mx-auto px-6 py-4 flex justify-center items-center gap-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer text-sm"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {page} of {total}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === total}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer text-sm"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ElearningBanner />
        <ElearningCategories categories={uniqueCategories} />

        {/* --- SECTION ENROLLED COURSES --- */}
        {isLoggedIn &&
          (enrolledCourses.length > 0 ? (
            <div>
              <ElearningEnrolledList
                title="Kursus yang Sedang Diikuti"
                subtitle="Lanjutkan progres belajar Anda."
                courses={currentEnrolledCourses}
              />
              <PaginationControl
                page={enrolledPage}
                total={totalEnrolledPages}
                onPageChange={setEnrolledPage}
              />
            </div>
          ) : (
            <section className="px-6 py-12">
              <div className="mb-6 container mx-auto">
                <h2 className="text-2xl font-bold mb-2">
                  Kursus yang Sedang Diikuti
                </h2>
                <p className="text-muted-foreground">
                  Lanjutkan progres belajar Anda.
                </p>
              </div>
              <div className="container mx-auto">
                <div className="w-full py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-gray-50/50">
                  <div className="bg-white p-4 rounded-full shadow-sm">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Belum ada kursus yang diikuti
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1">
                      Anda belum mendaftar di kursus manapun. Yuk, mulai
                      perjalanan belajar Anda sekarang!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))}

        {/* --- SECTION DISCOVERY / REKOMENDASI --- */}
        <div>
          <ElearningList
            title={
              isLoggedIn ? "Rekomendasi Untuk Anda" : "Temukan Keahlian Baru"
            }
            subtitle={
              isLoggedIn
                ? "Kursus yang disesuaikan dengan minat dan spesialisasi Anda."
                : "Perluas wawasan Anda dengan mempelajari topik-topik relevan."
            }
            courses={currentDiscoveryCourses}
          />
          <PaginationControl
            page={currentPage}
            total={totalDiscoveryPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <InfoSubscription
          subscriptions={subscriptions}
          loading={subsLoading}
          onSubscribe={handlePlanClick}
        />

        {/* --- SECTION POPULAR (Regular Courses Only) --- */}
        <div id="course" className="scroll-mt-10">
          <ElearningCourseList
            title="Kursus Terpopuler"
            subtitle="Lihat apa yang sedang dipelajari oleh ribuan anggota lain."
            courses={currentPopularCourses} 
          />
          <PaginationControl
            page={popularPage}
            total={totalPopularPages}
            onPageChange={setPopularPage}
          />
        </div>

        <InfoBootcamp />

        {/* --- SECTION BOOTCAMP (Bootcamp Only) --- */}
        <div id="bootcamp" className="scroll-mt-10">
          <ElearningBootcampList
            title="Kursus Bootcamp"
            subtitle="Pilih kursus terbaik untuk meningkatkan skill kamu"
            courses={currentBootcampCourses}
          />
          <PaginationControl
            page={bootcampPage}
            total={totalBootcampPages}
            onPageChange={setBootcampPage}
          />
        </div>

        {/* --- RENDER DIALOG DI PARENT --- */}
        <UpgradeSubscriptionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          planName={targetPlan}
          isLoading={isUpgrading}
          onConfirm={handleConfirmUpgrade}
        />
      </main>
    </div>
  );
};