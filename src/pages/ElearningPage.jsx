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
  const { hash } = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!localStorage.getItem("token");
  const ITEMS_PER_ROW = 8;

  // --- 1. STATE PAGINATION ---
  const [enrolledPage, setEnrolledPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // Discovery
  const [popularPage, setPopularPage] = useState(1); // Popular
  const [bootcampPage, setBootcampPage] = useState(1); // Bootcamp

  // --- 2. STATE SEARCH (WAJIB ADA) ---
  const [searchEnrolled, setSearchEnrolled] = useState("");
  const [searchDiscovery, setSearchDiscovery] = useState("");
  const [searchPopular, setSearchPopular] = useState("");
  const [searchBootcamp, setSearchBootcamp] = useState("");

  // --- 3. RESET PAGINATION SAAT SEARCH BERUBAH ---
  useEffect(() => setEnrolledPage(1), [searchEnrolled]);
  useEffect(() => setCurrentPage(1), [searchDiscovery]);
  useEffect(() => setPopularPage(1), [searchPopular]);
  useEffect(() => setBootcampPage(1), [searchBootcamp]);

  // --- LOGIC SUBSCRIPTION (Tetap Sama) ---
  const [subscriptions, setSubscriptions] = useState([]);
  const [subsLoading, setSubsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetPlan, setTargetPlan] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      setSubsLoading(true);
      const response = await subscriptionService.getMySubscriptions();
      if (response.sukses) setSubscriptions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubsLoading(false);
    }
  };
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const handlePlanClick = (plan) => {
    setTargetPlan(plan);
    setIsDialogOpen(true);
  };
  const handleConfirmUpgrade = async (method) => {
    // ... logic upgrade subscription kamu ...
    const activeSub = subscriptions.find((sub) => sub.status === "active");
    if (!activeSub) return alert("Tidak ada paket aktif.");
    try {
      setIsUpgrading(true);
      await subscriptionService.upgradeSubscription(activeSub.id, {
        plan: targetPlan,
        payment_method: method,
      });
      setIsDialogOpen(false);
      alert(`Berhasil upgrade ke ${targetPlan}!`);
      fetchSubscriptions();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal upgrade.");
    } finally {
      setIsUpgrading(false);
    }
  };

  // --- QUERY DATA ---
  const {
    data: courses = [],
    isLoading: loadingCourses,
    isError,
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
      } catch {
        return [];
      }
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (!loadingCourses && hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el)
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
    }
  }, [loadingCourses, hash]);

  // --- HELPER FILTER DATA (WAJIB ADA) ---
  const filterData = (data, query) => {
    if (!query) return data;
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // --- PREPARE DATA SOURCE (FILTER + SLICE) ---
  // 1. Enrolled
  const filteredEnrolled = filterData(enrolledCourses, searchEnrolled);
  const currentEnrolledCourses = filteredEnrolled.slice(
    (enrolledPage - 1) * ITEMS_PER_ROW,
    enrolledPage * ITEMS_PER_ROW
  );

  // 2. Discovery
  const rawDiscovery =
    isLoggedIn && Array.isArray(recData?.data) && recData.data.length > 0
      ? recData.data
      : courses;
  const filteredDiscovery = filterData(rawDiscovery, searchDiscovery);
  const currentDiscoveryCourses = filteredDiscovery.slice(
    (currentPage - 1) * ITEMS_PER_ROW,
    currentPage * ITEMS_PER_ROW
  );

  // 3. Popular
  const allRegular = courses.filter((c) => c.type === "course");
  const filteredPopular = filterData(allRegular, searchPopular);
  const currentPopularCourses = filteredPopular.slice(
    (popularPage - 1) * ITEMS_PER_ROW,
    popularPage * ITEMS_PER_ROW
  );

  // 4. Bootcamp
  const allBootcamp = courses.filter((c) => c.type === "bootcamp");
  const filteredBootcamp = filterData(allBootcamp, searchBootcamp);
  const currentBootcampCourses = filteredBootcamp.slice(
    (bootcampPage - 1) * ITEMS_PER_ROW,
    bootcampPage * ITEMS_PER_ROW
  );

  const uniqueCategories = [...new Set(courses.map((c) => c.category))];

  // --- 4. LOGIC KLIK KATEGORI (BARU) ---
  const handleCategoryClick = (categoryName) => {
    // 1. Set search di bagian Discovery
    setSearchDiscovery(categoryName);
    // 2. Reset halaman
    setCurrentPage(1);
    // 3. Scroll ke bagian Discovery
    const element = document.getElementById("discovery-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loadingCourses || (isLoggedIn && loadingRecs))
    return <ElearningPageSkeleton />;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">Gagal memuat data.</div>
    );

  // Pagination UI Helper
  const PaginationControl = ({ page, total, onPageChange }) => {
    if (total <= 1) return null;
    return (
      <div className="container mx-auto px-6 py-4 flex justify-center items-center gap-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent text-sm"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {page} of {total}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === total}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent text-sm"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        <ElearningBanner />

        {/* PASSING FUNGSI HANDLE CLICK KE KATEGORI */}
        <ElearningCategories
          categories={uniqueCategories}
          onCategoryClick={handleCategoryClick}
        />

        {/* --- 1. ENROLLED SECTION --- */}
        {isLoggedIn && (
          <div className="mt-8">
            {enrolledCourses.length > 0 ? (
              <>
                {/* KUNCI: PASSING PROPS SEARCHQUERY & ONSEARCHCHANGE */}
                <ElearningEnrolledList
                  title="Kursus yang Sedang Diikuti"
                  subtitle="Lanjutkan progres belajar Anda."
                  courses={currentEnrolledCourses}
                  searchQuery={searchEnrolled} // <-- INI WAJIB
                  onSearchChange={setSearchEnrolled} // <-- INI WAJIB
                />

                {/* Handle No Result */}
                {filteredEnrolled.length === 0 && searchEnrolled && (
                  <div className="text-center pb-10 text-gray-500 -mt-4">
                    Tidak ditemukan kursus.
                  </div>
                )}

                <PaginationControl
                  page={enrolledPage}
                  total={Math.ceil(filteredEnrolled.length / ITEMS_PER_ROW)}
                  onPageChange={setEnrolledPage}
                />
              </>
            ) : (
              // Empty State Original (Belum enroll apapun)
              <section className="px-6 py-12 container mx-auto">
                <h2 className="text-2xl font-bold mb-2">
                  Kursus yang Sedang Diikuti
                </h2>
                <p className="text-muted-foreground mb-6">
                  Lanjutkan progres belajar Anda.
                </p>
                <div className="w-full py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-gray-50/50">
                  <div className="bg-white p-4 rounded-full shadow-sm">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Belum ada kursus yang diikuti
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Yuk, mulai perjalanan belajar Anda sekarang!
                  </p>
                </div>
              </section>
            )}
          </div>
        )}

        {/* --- 2. DISCOVERY SECTION --- */}
        {/* TAMBAHKAN ID DAN SCROLL MARGIN BIAR RAPI */}
        <div id="discovery-section" className="mt-8 scroll-mt-10">
          <ElearningList
            title={
              isLoggedIn ? "Rekomendasi Untuk Anda" : "Temukan Keahlian Baru"
            }
            subtitle={
              isLoggedIn
                ? "Kursus yang disesuaikan minat Anda."
                : "Perluas wawasan Anda."
            }
            courses={currentDiscoveryCourses}
            searchQuery={searchDiscovery} // <-- PASSING PROPS
            onSearchChange={setSearchDiscovery} // <-- PASSING PROPS
          />
          {filteredDiscovery.length === 0 && searchDiscovery && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada kursus ditemukan.
            </div>
          )}
          <PaginationControl
            page={currentPage}
            total={Math.ceil(filteredDiscovery.length / ITEMS_PER_ROW)}
            onPageChange={setCurrentPage}
          />
        </div>

        <div id="subscription" className="scroll-mt-10 mt-8">
          <InfoSubscription
            subscriptions={subscriptions}
            loading={subsLoading}
            onSubscribe={handlePlanClick}
          />
        </div>

        {/* --- 3. POPULAR SECTION --- */}
        <div id="course" className="scroll-mt-10 mt-8">
          <ElearningCourseList
            title="Kursus Terpopuler"
            subtitle="Lihat apa yang sedang dipelajari orang lain."
            courses={currentPopularCourses}
            searchQuery={searchPopular} // <-- PASSING PROPS
            onSearchChange={setSearchPopular} // <-- PASSING PROPS
          />
          {filteredPopular.length === 0 && searchPopular && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada kursus populer ditemukan.
            </div>
          )}
          <PaginationControl
            page={popularPage}
            total={Math.ceil(filteredPopular.length / ITEMS_PER_ROW)}
            onPageChange={setPopularPage}
          />
        </div>

        <InfoBootcamp />

        {/* --- 4. BOOTCAMP SECTION --- */}
        <div id="bootcamp" className="scroll-mt-10 mt-8">
          <ElearningBootcampList
            title="Kursus Bootcamp"
            subtitle="Pilih kursus terbaik untuk meningkatkan skill kamu"
            courses={currentBootcampCourses}
            searchQuery={searchBootcamp} // <-- PASSING PROPS
            onSearchChange={setSearchBootcamp} // <-- PASSING PROPS
          />
          {filteredBootcamp.length === 0 && searchBootcamp && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada bootcamp ditemukan.
            </div>
          )}
          <PaginationControl
            page={bootcampPage}
            total={Math.ceil(filteredBootcamp.length / ITEMS_PER_ROW)}
            onPageChange={setBootcampPage}
          />
        </div>

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
