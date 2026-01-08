import React, { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { BookOpen, Loader2, X, Search } from "lucide-react";

// IMPORT COMPONENTS
import { ElearningBanner } from "../components/section/ElearningBanner";
import { ElearningCategories } from "../components/section/ElearningCategories";
import { ElearningCourseList } from "../components/section/ElearningCourseList";
import { ElearningList } from "@/components/section/ElearningList";
import { InfoBootcamp } from "@/components/section/InfoBootcampSection";
import { ElearningBootcampList } from "@/components/section/ElearningBootcampList";
import { ElearningEnrolledList } from "@/components/section/ElearningEnrolledList";
import { ElearningPageSkeleton } from "@/components/skeleton/ElearningPageSkeleton";
import { InfoSubscription } from "@/components/section/InfoSubscription";
import { SubscriptionDialog } from "@/components/dialog/SubscriptionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Pastikan import Skeleton shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// IMPORT SERVICES
import ElearningService from "@/services/elearningService";
import ProfileService from "@/services/ProfileService";
import { subscriptionService } from "@/services/SubscriptionService";

// --- CUSTOM HOOK: DEBOUNCE ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// --- COMPONENT: SECTION SKELETON (Untuk loading per-section) ---
const CourseSectionSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="flex flex-col space-y-3">
          <Skeleton className="h-56 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex justify-between pt-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ElearningPage = () => {
  const { hash } = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // --- STATE SUBSCRIPTION ---
  const [subscriptions, setSubscriptions] = useState([]);
  const [subsLoading, setSubsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetPlan, setTargetPlan] = useState("");

  // ==========================================
  // 1. STATE & PARAMS
  // ==========================================
  const [enrolledParams, setEnrolledParams] = useState({ page: 1, search: "" });

  // Recommendations
  const [recInput, setRecInput] = useState("");
  const debouncedRec = useDebounce(recInput, 500);
  const [recParams, setRecParams] = useState({ page: 1, search: "" });

  // Discovery
  const [discoveryInput, setDiscoveryInput] = useState("");
  const debouncedDiscovery = useDebounce(discoveryInput, 500);

const [categoryInput, setCategoryInput] = useState(""); 
  const debouncedCategory = useDebounce(categoryInput, 500); // Debounce biar gak lag

  const [discoveryParams, setDiscoveryParams] = useState({
    page: 1,
    search: "",
    category: "",
    level: "",
    access_type: "",
    type: "course",
  });

  // Popular
  const [popularInput, setPopularInput] = useState("");
  const debouncedPopular = useDebounce(popularInput, 500);
  const [popularParams, setPopularParams] = useState({
    page: 1,
    search: "",
    type: "course",
    sort: "popular",
  });

  // Bootcamp
  const [bootcampInput, setBootcampInput] = useState("");
  const debouncedBootcamp = useDebounce(bootcampInput, 500);
  const [bootcampParams, setBootcampParams] = useState({
    page: 1,
    search: "",
    type: "bootcamp",
  });

  // --- SYNC INPUT TO PARAMS ---
  useEffect(
    () => setRecParams((p) => ({ ...p, search: debouncedRec, page: 1 })),
    [debouncedRec]
  );
  useEffect(
    () =>
      setDiscoveryParams((p) => ({
        ...p,
        search: debouncedDiscovery,
        category: debouncedCategory,
        page: 1,
      })),
    [debouncedDiscovery, debouncedCategory]
  );
  useEffect(
    () =>
      setPopularParams((p) => ({ ...p, search: debouncedPopular, page: 1 })),
    [debouncedPopular]
  );
  useEffect(
    () =>
      setBootcampParams((p) => ({ ...p, search: debouncedBootcamp, page: 1 })),
    [debouncedBootcamp]
  );

  // --- QUERIES (With placeholderData for Pagination Smoothness) ---

  const { data: enrolledData } = useQuery({
    queryKey: ["enrolled", enrolledParams],
    queryFn: () => ProfileService.getEnrolledCourses(enrolledParams),
    enabled: isLoggedIn,
    placeholderData: keepPreviousData,
  });
  const enrolledList = enrolledData?.data || [];
  const enrolledMeta = enrolledData?.meta || {};

  const { data: recData, isFetching: isRefetchingRec } = useQuery({
    queryKey: ["recommendations", recParams],
    queryFn: () => ProfileService.getRecommendations(recParams),
    enabled: isLoggedIn,
    placeholderData: keepPreviousData,
  });
  const recList = recData?.data?.recommendations || [];
  const recMeta = recData?.meta || {};

  const {
    data: discoveryData,
    isLoading: isInitialLoadingDiscovery,
    isFetching: isRefetchingDiscovery,
  } = useQuery({
    queryKey: ["discovery", discoveryParams],
    queryFn: () => ElearningService.getCourses(discoveryParams),
    placeholderData: keepPreviousData,
  });
  const discoveryList = discoveryData?.data || [];
  const discoveryMeta = discoveryData?.meta || {};

  const { data: popularData, isFetching: isRefetchingPopular } = useQuery({
    queryKey: ["popular", popularParams],
    queryFn: () => ElearningService.getCourses(popularParams),
    placeholderData: keepPreviousData,
  });
  const popularList = popularData?.data || [];
  const popularMeta = popularData?.meta || {};

  const { data: bootcampData, isFetching: isRefetchingBootcamp } = useQuery({
    queryKey: ["bootcamp", bootcampParams],
    queryFn: () => ElearningService.getCourses(bootcampParams),
    placeholderData: keepPreviousData,
  });
  const bootcampList = bootcampData?.data || [];
  const bootcampMeta = bootcampData?.meta || {};

  // --- HELPERS ---
  const handlePlanClick = (plan) => {
    setTargetPlan(plan);
    setIsDialogOpen(true);
  };
  const handleSubscriptionSuccess = () => setIsDialogOpen(false);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await subscriptionService.getMySubscriptions();
        if (res.sukses) setSubscriptions(res.data);
      } finally {
        setSubsLoading(false);
      }
    };
    fetchSubs();
  }, []);

  useEffect(() => {
    if (!isInitialLoadingDiscovery && hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el)
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
    }
  }, [isInitialLoadingDiscovery, hash]);

  // --- COMPONENTS ---
  const PaginationControl = ({ meta, onPageChange }) => {
    const currentPage = meta?.halaman_sekarang || 1;
    const lastPage = meta?.halaman_terakhir || 1;
    const total = meta?.total || 0;
    if (total === 0 || lastPage <= 1) return null;
    return (
      <div className="cmx-auto px-6 py-4 flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {lastPage}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    );
  };

  const EmptyStateBox = ({ title, onReset }) => (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-white flex flex-col items-center justify-center gap-3">
      <div className="bg-gray-50 p-4 rounded-full">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Tidak ada {title} ditemukan
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto text-sm">
          Coba ubah kata kunci pencarian atau filter Anda.
        </p>
      </div>
      <Button variant="outline" onClick={onReset}>
        Reset Pencarian
      </Button>
    </div>
  );

  if (isInitialLoadingDiscovery && !discoveryData)
    return <ElearningPageSkeleton />;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        <ElearningBanner />

        <ElearningCategories
          categories={[
            "Web Development",
            "Data Science",
            "Mobile Dev",
            "Design",
            "Soft Skills",
            "Game Development",
            "Cyber Security",
            "DevOps", 
            "Cloud Computing",
            "Business",
          ]}
          onCategoryClick={(cat) => {
            setDiscoveryParams((p) => ({ ...p, category: cat, page: 1 }));
            document
              .getElementById("discovery-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* --- 1. ENROLLED SECTION --- */}
        {isLoggedIn && (
          <div className="mt-6">
            {enrolledList.length > 0 || enrolledParams.search !== "" ? (
              <>
                <ElearningEnrolledList
                  title="Kursus yang Sedang Diikuti"
                  subtitle="Lanjutkan progres belajar Anda."
                  courses={enrolledList}
                  searchQuery={enrolledParams.search}
                  onSearchChange={(val) =>
                    setEnrolledParams((p) => ({ ...p, search: val, page: 1 }))
                  }
                />
                {enrolledList.length === 0 && enrolledParams.search !== "" && (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada kursus yang cocok dengan pencarian.
                  </div>
                )}
                <PaginationControl
                  meta={enrolledMeta}
                  onPageChange={(page) =>
                    setEnrolledParams((p) => ({ ...p, page }))
                  }
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

        {/* --- 2. RECOMMENDATION SECTION (SKELETON) --- */}
        {isLoggedIn && (recList.length > 0 || recInput !== "") && (
          <div id="recommendation-section" className="mt-8 scroll-mt-10 px-6 border-t pt-8">
            <div className="mx-auto mb-4 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Rekomendasi Untuk Anda
                </h2>
                <p className="text-gray-500">
                  Kursus yang disesuaikan minat Anda.
                </p>
              </div>
            </div>

            {/* Logic: Jika fetching karena search, tampilkan Skeleton. Jika tidak, tampilkan data */}
            {isRefetchingRec ? (
              <div className="mx-auto px-6">
                <CourseSectionSkeleton />
              </div>
            ) : (
              <ElearningList courses={recList} hideHeader />
            )}

            {!isRefetchingRec && recList.length === 0 && recInput !== "" && (
              <div className="px-6">
                <EmptyStateBox
                  title="rekomendasi"
                  onReset={() => setRecInput("")}
                />
              </div>
            )}

            <PaginationControl
              meta={recMeta}
              onPageChange={(page) => setRecParams((p) => ({ ...p, page }))}
            />
          </div>
        )}

        {/* --- 3. DISCOVERY SECTION (SKELETON) --- */}
        <div id="discovery-section" className="mt-8 scroll-mt-10 mx-auto px-6 border-t pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Temukan Keahlian Baru
              </h2>
              <p className="text-gray-500">
                Jelajahi semua kursus yang tersedia.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <Input
                placeholder="Cari kursus..."
                className="w-full lg:w-64"
                value={discoveryInput}
                onChange={(e) => setDiscoveryInput(e.target.value)}
              />

              {/* 2. Input Search Kategori (PENGGANTI COMBOBOX) */}
              <Input
                placeholder="Cari kategori..."
                className="w-full lg:w-40"
                value={categoryInput} // Menggunakan state khusus kategori
                onChange={(e) => setCategoryInput(e.target.value)}
              />

              <Select
                value={discoveryParams.level}
                onValueChange={(val) =>
                  setDiscoveryParams((p) => ({
                    ...p,
                    level: val === "all" ? "" : val,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={discoveryParams.access_type}
                onValueChange={(val) =>
                  setDiscoveryParams((p) => ({
                    ...p,
                    access_type: val === "all" ? "" : val,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Akses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Akses</SelectItem>
                  <SelectItem value="free">Gratis</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(discoveryInput !== "" || discoveryParams.level !== "" || discoveryParams.access_type !== "" || discoveryParams.category !== "") && (
             <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                <div className="text-primary">
                   <span className="mr-1">Anda sedang melihat hasil untuk:</span>
                   
                   {/* Logic menampilkan teks sesuai filter yang aktif */}
                   {discoveryParams.category && <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 mr-2">{discoveryParams.category}</span>}
                   {discoveryInput && <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 mr-2">"{discoveryInput}"</span>}
                   {discoveryParams.level && <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 mr-2">Level {discoveryParams.level}</span>}
                   {discoveryParams.access_type && <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 mr-2">{discoveryParams.access_type}</span>}
                </div>

                <button 
                  onClick={() => {
                      setDiscoveryInput("");
                      setDiscoveryParams(p => ({ 
                          ...p, 
                          search: "", level: "", access_type: "", category: "", page: 1 
                      }));
                  }}
                  className="whitespace-nowrap font-semibold text-primary/80 hover:text-primary hover:underline flex items-center gap-1"
                >
                   <X className="h-3 w-3" /> Reset Filter
                </button>
             </div>
          )}

          {/* Logic Skeleton Discovery */}
          {isRefetchingDiscovery ? (
            <CourseSectionSkeleton />
          ) : (
            <ElearningList courses={discoveryList} hideHeader />
          )}

          {!isRefetchingDiscovery &&
            discoveryList.length === 0 &&
            !isInitialLoadingDiscovery && (
              <EmptyStateBox
                title="kursus"
                onReset={() => {
                  setDiscoveryInput("");
                  setDiscoveryParams((p) => ({
                    ...p,
                    level: "",
                    access_type: "",
                    category: "",
                    page: 1,
                  }));
                }}
              />
            )}

          <PaginationControl
            meta={discoveryMeta}
            onPageChange={(page) => setDiscoveryParams((p) => ({ ...p, page }))}
          />
        </div>

        <div id="subscription" className="scroll-mt-10 mt-8">
          <InfoSubscription
            subscriptions={subscriptions}
            loading={subsLoading}
            onSubscribe={handlePlanClick}
          />
        </div>

        {/* --- 4. POPULAR SECTION (SKELETON) --- */}
        <div id="course" className="scroll-mt-10 mt-8 mx-auto px-6 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Kursus Terpopuler
              </h2>
              <p className="text-gray-500">
                Lihat apa yang sedang dipelajari orang lain.
              </p>
            </div>
            <div className="w-full md:w-64">
              <Input
                placeholder="Cari kursus populer..."
                value={popularInput}
                onChange={(e) => setPopularInput(e.target.value)}
              />
            </div>
          </div>

          {/* Logic Skeleton Popular */}
          {isRefetchingPopular ? (
            <CourseSectionSkeleton />
          ) : (
            <ElearningList courses={popularList} hideHeader />
          )}

          {!isRefetchingPopular && popularList.length === 0 && (
            <EmptyStateBox
              title="kursus populer"
              onReset={() => setPopularInput("")}
            />
          )}

          <PaginationControl
            meta={popularMeta}
            onPageChange={(page) => setPopularParams((p) => ({ ...p, page }))}
          />
        </div>

        <InfoBootcamp />

        {/* --- 5. BOOTCAMP SECTION (SKELETON) --- */}
        <div id="bootcamp" className="scroll-mt-10 mt-8 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Kursus Bootcamp
              </h2>
              <p className="text-gray-500">
                Pilih kursus terbaik untuk meningkatkan skill kamu
              </p>
            </div>
            <div className="w-full md:w-64">
              <Input
                placeholder="Cari bootcamp..."
                value={bootcampInput}
                onChange={(e) => setBootcampInput(e.target.value)}
              />
            </div>
          </div>

          {/* Logic Skeleton Bootcamp */}
          {isRefetchingBootcamp ? (
            <CourseSectionSkeleton />
          ) : (
            <ElearningList courses={bootcampList} hideHeader />
          )}

          {!isRefetchingBootcamp && bootcampList.length === 0 && (
            <EmptyStateBox
              title="bootcamp"
              onReset={() => setBootcampInput("")}
            />
          )}

          <PaginationControl
            meta={bootcampMeta}
            onPageChange={(page) => setBootcampParams((p) => ({ ...p, page }))}
          />
        </div>

        <SubscriptionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          planName={targetPlan}
          onSuccess={handleSubscriptionSuccess}
        />
      </main>
    </div>
  );
};
