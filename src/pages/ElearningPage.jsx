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

  // --- KONFIGURASI JUMLAH ITEM PER HALAMAN ---
  const ITEMS_PER_PAGE_SMALL = 4; // Khusus Enrolled & Rekomendasi
  const ITEMS_PER_PAGE_DEFAULT = 8; // Khusus Discovery, Popular, Bootcamp

  // --- 1. STATE PAGINATION ---
  const [enrolledPage, setEnrolledPage] = useState(1);
  const [recPage, setRecPage] = useState(1);
  const [discoveryPage, setDiscoveryPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [bootcampPage, setBootcampPage] = useState(1);

  // --- 2. STATE SEARCH ---
  const [searchEnrolled, setSearchEnrolled] = useState("");
  const [searchRec, setSearchRec] = useState("");
  const [searchDiscovery, setSearchDiscovery] = useState("");
  const [searchPopular, setSearchPopular] = useState("");
  const [searchBootcamp, setSearchBootcamp] = useState("");

  // --- 3. RESET PAGINATION ---
  useEffect(() => setEnrolledPage(1), [searchEnrolled]);
  useEffect(() => setRecPage(1), [searchRec]);
  useEffect(() => setDiscoveryPage(1), [searchDiscovery]);
  useEffect(() => setPopularPage(1), [searchPopular]);
  useEffect(() => setBootcampPage(1), [searchBootcamp]);

  // --- LOGIC SUBSCRIPTION ---
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

  // --- HELPER FILTER ---
  const filterData = (data, query) => {
    if (!query) return data;
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // --- PREPARE DATA SOURCE ---

  // 1. Enrolled (PAKAI ITEMS_PER_PAGE_SMALL = 4)
  const filteredEnrolled = filterData(enrolledCourses, searchEnrolled);
  const currentEnrolledCourses = filteredEnrolled.slice(
    (enrolledPage - 1) * ITEMS_PER_PAGE_SMALL,
    enrolledPage * ITEMS_PER_PAGE_SMALL
  );

  // 2. Recommendations (PAKAI ITEMS_PER_PAGE_SMALL = 4)
  const rawRecommendations = isLoggedIn
    ? recData?.data?.recommendations || []
    : [];
  const filteredRecs = filterData(rawRecommendations, searchRec);
  const currentRecCourses = filteredRecs.slice(
    (recPage - 1) * ITEMS_PER_PAGE_SMALL,
    recPage * ITEMS_PER_PAGE_SMALL
  );

  // 3. Discovery (PAKAI ITEMS_PER_PAGE_DEFAULT = 8)
  const rawDiscovery = courses;
  const filteredDiscovery = filterData(rawDiscovery, searchDiscovery);
  const currentDiscoveryCourses = filteredDiscovery.slice(
    (discoveryPage - 1) * ITEMS_PER_PAGE_DEFAULT,
    discoveryPage * ITEMS_PER_PAGE_DEFAULT
  );

  // 4. Popular (PAKAI ITEMS_PER_PAGE_DEFAULT = 8)
  const allRegular = courses.filter((c) => c.type === "course");
  const filteredPopular = filterData(allRegular, searchPopular);
  const currentPopularCourses = filteredPopular.slice(
    (popularPage - 1) * ITEMS_PER_PAGE_DEFAULT,
    popularPage * ITEMS_PER_PAGE_DEFAULT
  );

  // 5. Bootcamp (PAKAI ITEMS_PER_PAGE_DEFAULT = 8)
  const allBootcamp = courses.filter((c) => c.type === "bootcamp");
  const filteredBootcamp = filterData(allBootcamp, searchBootcamp);
  const currentBootcampCourses = filteredBootcamp.slice(
    (bootcampPage - 1) * ITEMS_PER_PAGE_DEFAULT,
    bootcampPage * ITEMS_PER_PAGE_DEFAULT
  );

  const uniqueCategories = [...new Set(courses.map((c) => c.category))];

  const handleCategoryClick = (categoryName) => {
    setSearchDiscovery(categoryName);
    setDiscoveryPage(1);
    const element = document.getElementById("discovery-section");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loadingCourses || (isLoggedIn && loadingRecs))
    return <ElearningPageSkeleton />;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">Gagal memuat data.</div>
    );

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

        <ElearningCategories
          categories={uniqueCategories}
          onCategoryClick={handleCategoryClick}
        />

        {/* --- 1. ENROLLED SECTION (Limit 4) --- */}
        {isLoggedIn && (
          <div className="mt-8">
            {enrolledCourses.length > 0 ? (
              <>
                <ElearningEnrolledList
                  title="Kursus yang Sedang Diikuti"
                  subtitle="Lanjutkan progres belajar Anda."
                  courses={currentEnrolledCourses}
                  searchQuery={searchEnrolled}
                  onSearchChange={setSearchEnrolled}
                />
                {filteredEnrolled.length === 0 && searchEnrolled && (
                  <div className="text-center pb-10 text-gray-500 -mt-4">
                    Tidak ditemukan kursus.
                  </div>
                )}

                {/* Pagination pakai ITEMS_PER_PAGE_SMALL */}
                <PaginationControl
                  page={enrolledPage}
                  total={Math.ceil(
                    filteredEnrolled.length / ITEMS_PER_PAGE_SMALL
                  )}
                  onPageChange={setEnrolledPage}
                />
              </>
            ) : (
              <section className="px-6 py-12 mx-auto">
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

        {/* --- 2. RECOMMENDATION SECTION (Limit 4) --- */}
        {isLoggedIn && rawRecommendations.length > 0 && (
          <div id="recommendation-section" className="mt-8 scroll-mt-10">
            <ElearningList
              title="Rekomendasi Untuk Anda"
              subtitle="Kursus yang disesuaikan minat Anda."
              courses={currentRecCourses}
              searchQuery={searchRec}
              onSearchChange={setSearchRec}
            />
            {filteredRecs.length === 0 && searchRec && (
              <div className="text-center pb-10 text-gray-500 -mt-4">
                Tidak ada rekomendasi ditemukan.
              </div>
            )}

            {/* Pagination pakai ITEMS_PER_PAGE_SMALL */}
            <PaginationControl
              page={recPage}
              total={Math.ceil(filteredRecs.length / ITEMS_PER_PAGE_SMALL)}
              onPageChange={setRecPage}
            />
          </div>
        )}

        {/* --- 3. DISCOVERY SECTION (Limit 8) --- */}
        <div id="discovery-section" className="mt-8 scroll-mt-10">
          <ElearningList
            title="Temukan Keahlian Baru"
            subtitle="Jelajahi semua kursus yang tersedia untuk meningkatkan skill Anda."
            courses={currentDiscoveryCourses}
            searchQuery={searchDiscovery}
            onSearchChange={setSearchDiscovery}
          />
          {filteredDiscovery.length === 0 && searchDiscovery && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada kursus ditemukan.
            </div>
          )}

          {/* Pagination pakai ITEMS_PER_PAGE_DEFAULT */}
          <PaginationControl
            page={discoveryPage}
            total={Math.ceil(filteredDiscovery.length / ITEMS_PER_PAGE_DEFAULT)}
            onPageChange={setDiscoveryPage}
          />
        </div>

        <div id="subscription" className="scroll-mt-10 mt-8">
          <InfoSubscription
            subscriptions={subscriptions}
            loading={subsLoading}
            onSubscribe={handlePlanClick}
          />
        </div>

        {/* --- 4. POPULAR SECTION (Limit 8) --- */}
        <div id="course" className="scroll-mt-10 mt-8">
          <ElearningCourseList
            title="Kursus Terpopuler"
            subtitle="Lihat apa yang sedang dipelajari orang lain."
            courses={currentPopularCourses}
            searchQuery={searchPopular}
            onSearchChange={setSearchPopular}
          />
          {filteredPopular.length === 0 && searchPopular && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada kursus populer ditemukan.
            </div>
          )}
          <PaginationControl
            page={popularPage}
            total={Math.ceil(filteredPopular.length / ITEMS_PER_PAGE_DEFAULT)}
            onPageChange={setPopularPage}
          />
        </div>

        <InfoBootcamp />

        {/* --- 5. BOOTCAMP SECTION (Limit 8) --- */}
        <div id="bootcamp" className="scroll-mt-10 mt-8">
          <ElearningBootcampList
            title="Kursus Bootcamp"
            subtitle="Pilih kursus terbaik untuk meningkatkan skill kamu"
            courses={currentBootcampCourses}
            searchQuery={searchBootcamp}
            onSearchChange={setSearchBootcamp}
          />
          {filteredBootcamp.length === 0 && searchBootcamp && (
            <div className="text-center pb-10 text-gray-500 -mt-4">
              Tidak ada bootcamp ditemukan.
            </div>
          )}
          <PaginationControl
            page={bootcampPage}
            total={Math.ceil(filteredBootcamp.length / ITEMS_PER_PAGE_DEFAULT)}
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
