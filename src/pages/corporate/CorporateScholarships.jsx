import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// Services
import ScholarshipService from "@/services/corporate/ScholarshipService";

// Components
import { ScholarshipStats } from "@/components/corporate/ScholarshipStats";
import { ScholarshipTable } from "@/components/corporate/table/ScholarshipTable";
import { CorporateCreateScholarshipDialog } from "@/components/corporate/dialog/CreateScholarshipDialog";
import { EditScholarshipDialog } from "@/components/corporate/dialog/EditScholarshipDialog";
import { ViewScholarshipDialog } from "@/components/corporate/dialog/ViewScholarshipDialog";

export const CorporateManageScholarships = () => {
  const queryClient = useQueryClient();
  // user.id tidak kita pakai untuk organization_id lagi (sesuai request sebelumnya)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // --- STATE ---
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filter States
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [studyFieldFilter, setStudyFieldFilter] = useState("");

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Selected Data
  const [editingItem, setEditingItem] = useState(null);
  const [viewItemId, setViewItemId] = useState(null);

  // --- EFFECT ---
  // Reset page ke 1 setiap kali ada filter yang berubah
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, locationFilter, studyFieldFilter]);

  // --- QUERIES ---
  const {
    data: apiResponse,
    isLoading: loadingData,
    isPlaceholderData,
  } = useQuery({
    // Masukkan semua parameter ke queryKey agar auto-refetch
    queryKey: [
      "corporate-scholarships",
      page,
      search,
      statusFilter,
      locationFilter,
      studyFieldFilter,
    ],
    queryFn: () =>
      ScholarshipService.getMyScholarships({
        page,
        search,
        status: statusFilter,
        location: locationFilter,
        study_field: studyFieldFilter,
      }),
    placeholderData: keepPreviousData,
  });

  // Extract Data & Meta
  const scholarships = apiResponse?.data || [];
  const meta = apiResponse?.meta || {};

  // Hitung Stats (Client-side estimate dari data yang ada/meta)
  // Idealnya backend menyediakan endpoint khusus /stats agar akurat untuk seluruh database
  const stats = {
    total: meta.total || 0,
    active: scholarships.filter((s) => s.status === "open").length,
    coming_soon: scholarships.filter((s) => s.status === "coming_soon").length,
    closed: scholarships.filter((s) => s.status === "closed").length,
    applicants: scholarships.reduce(
      (acc, curr) => acc + (curr.applicants_count || 0),
      0
    ),
  };

  // --- MUTATIONS ---

  const createMutation = useMutation({
    mutationFn: (formData) => {
      // Logic khusus: Convert organization_id ke Integer
      const payload = {
        ...formData,
        organization_id: parseInt(formData.organization_id),
      };
      console.log("Sending Payload:", payload);
      return ScholarshipService.createScholarship(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporate-scholarships"] });
      setIsAddOpen(false);
      alert("Beasiswa berhasil dibuat!");
    },
    onError: (err) => {
      console.error(err);
      alert("Gagal membuat beasiswa. Cek console.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      ScholarshipService.updateScholarship(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporate-scholarships"] });
      setIsEditOpen(false);
      setEditingItem(null);
      alert("Beasiswa berhasil diperbarui!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => ScholarshipService.deleteScholarship(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporate-scholarships"] });
      alert("Beasiswa berhasil dihapus.");
    },
  });

  // --- HANDLERS ---
  const handleCreateSubmit = (formData) => createMutation.mutate(formData);
  const handleEditSubmit = (formData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    }
  };
  const handleDelete = (id) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus beasiswa ini? Data pelamar juga akan terhapus."
      )
    ) {
      deleteMutation.mutate(id);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditOpen(true);
  };
  const handleView = (id) => {
    setViewItemId(id);
    setIsViewOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. STATISTIK */}
      <ScholarshipStats stats={stats} />

      {/* 2. HEADER & FILTERS */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Title & Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-neutral-800">
              Manajemen Beasiswa
            </h1>
            <p className="text-muted-foreground">
              Kelola program beasiswa, pantau status, dan lihat pelamar.
            </p>
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-primary hover:bg-primary/90 mt-2 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Buat Baru
          </Button>
        </div>

        {/* Filter Bar (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 rounded-lg border shadow-sm">
          {/* A. Search Name */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari beasiswa..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* B. Filter Location */}
          <div className="relative">
            <Input
              placeholder="Lokasi (e.g. Jerman)..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          {/* C. Filter Study Field */}
          <div className="relative">
            <Input
              placeholder="Bidang (e.g. Engineer)..."
              value={studyFieldFilter}
              onChange={(e) => setStudyFieldFilter(e.target.value)}
            />
          </div>

          {/* D. Filter Status Dropdown */}
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 3. TABLE */}
      {loadingData ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <ScholarshipTable
            data={scholarships} // Data server-side (sudah difilter backend)
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* 4. PAGINATION CONTROLS */}
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="text-sm text-muted-foreground">
              Halaman {meta?.halaman_sekarang || 1} dari{" "}
              {meta?.halaman_terakhir || 1} (Total: {meta?.total || 0})
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1 || loadingData}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (
                    !isPlaceholderData &&
                    page < (meta?.halaman_terakhir || 1)
                  ) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={
                  isPlaceholderData ||
                  page >= (meta?.halaman_terakhir || 1) ||
                  loadingData
                }
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* DIALOGS */}
      <CorporateCreateScholarshipDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleCreateSubmit}
        isLoading={createMutation.isPending}
      />
      <EditScholarshipDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        itemToEdit={editingItem}
        onSave={handleEditSubmit}
        isLoading={updateMutation.isPending}
      />
      <ViewScholarshipDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        scholarshipId={viewItemId}
      />
    </div>
  );
};