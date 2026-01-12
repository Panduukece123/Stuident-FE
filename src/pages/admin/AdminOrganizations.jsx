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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  Loader2,
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  ChevronLeft,
  ChevronRight,
  Landmark,
} from "lucide-react";

// --- IMPORTS COMPONENTS & SERVICES ---
import OrganizationService from "@/services/corporate/OrganizationService";
import { OrganizationTable } from "@/components/admin/table/OrganizationTable";
import { OrganizationDetailDialog } from "@/components/admin/dialog/OrganizationDetailDialog";
import { EditOrganizationDialog } from "@/components/admin/dialog/EditOrganizationDialog";
import { CreateOrganizationDialog } from "@/components/admin/dialog/CreateOrganizationDialog";

export const ManageOrganizations = () => {
  const queryClient = useQueryClient();

  // --- STATE ---
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // --- EFFECT ---
  useEffect(() => {
    setPage(1);
  }, [search, typeFilter]);

  // --- QUERY ---
  const {
    data: apiResponse,
    isLoading: loadingData,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["admin-organizations", page, search, typeFilter],
    queryFn: () =>
      OrganizationService.getOrganizations({
        page,
        search,
        type: typeFilter,
      }),
    placeholderData: keepPreviousData,
  });

  const organizations = apiResponse?.data || [];
  const meta = apiResponse?.meta || {};

  // --- STATS ---
  const stats = {
    total: meta.total || 0,
    companies: organizations.filter((o) => o.type === "company").length,
    universities: organizations.filter((o) => o.type === "university").length,
    communities: organizations.filter((o) => o.type === "community").length,
    governments: organizations.filter((o) => o.type === "government").length,
  };

  // --- MUTATION ---
  const deleteMutation = useMutation({
    mutationFn: OrganizationService.deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      alert("Organization deleted successfully!");
    },
    onError: (err) => {
      console.error(err);
      alert("Gagal menghapus data. Pastikan data tidak sedang digunakan.");
    },
  });

  // --- HANDLERS ---
  const handleView = (id) => {
    setViewId(id);
    setIsViewOpen(true);
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditOpen(true);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this organization?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* 1. STATISTICS CARDS */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All organizations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Briefcase className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.companies}</div>
            <p className="text-xs text-muted-foreground">Page view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universities</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.universities}</div>
            <p className="text-xs text-muted-foreground">Page view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communities</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.communities}</div>
            <p className="text-xs text-muted-foreground">Page view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Government</CardTitle>
            <Landmark className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.governments}</div>
            <p className="text-xs text-muted-foreground">Page view</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. HEADER & ACTIONS (Layout Mirip ManageUsers) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        
        {/* Left: Title */}
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">
            Organizations
          </h1>
          <p className="text-muted-foreground">
            Manage partners, companies, universities, and communities.
          </p>
        </div>

        {/* Right: Search, Filter & Add Button */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    
          {/* Type Filter Dropdown */}
          <div className="w-full md:w-[180px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <Button onClick={() => setIsAddOpen(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>

        </div>
      </div>

      {/* 3. TABLE */}
      {loadingData ? (
        <div className="flex justify-center py-20 bg-white rounded-lg border">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">Loading data...</span>
          </div>
        </div>
      ) : (
        <>
          <OrganizationTable
            organizations={organizations}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* 4. PAGINATION CONTROLS */}
          <div className="flex items-center justify-between px-2">
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
                  if (!isPlaceholderData && page < (meta?.halaman_terakhir || 1)) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={isPlaceholderData || page >= (meta?.halaman_terakhir || 1) || loadingData}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* 5. DIALOGS */}
      <OrganizationDetailDialog
        open={isViewOpen}
        onOpenChange={(val) => {
          setIsViewOpen(val);
          if (!val) setViewId(null);
        }}
        organization={organizations.find((o) => o.id === viewId)}
      />

      <EditOrganizationDialog
        open={isEditOpen}
        onOpenChange={(val) => {
          setIsEditOpen(val);
          if (!val) setEditItem(null);
        }}
        organization={editItem}
      />

      <CreateOrganizationDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
          setIsAddOpen(false);
        }}
      />
    </div>
  );
};