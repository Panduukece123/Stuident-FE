import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Plus, Search, Loader2, Building2, Briefcase, GraduationCap, Users } from "lucide-react";

// --- IMPORTS COMPONENTS & SERVICES ---
import OrganizationService from "@/services/corporate/OrganizationService";
import { OrganizationTable } from "@/components/admin/table/OrganizationTable";
import { OrganizationDetailDialog } from "@/components/admin/dialog/OrganizationDetailDialog";
import { EditOrganizationDialog } from "@/components/admin/dialog/EditOrganizationDialog";
import { CreateOrganizationDialog } from "@/components/admin/dialog/CreateOrganizationDialog";

// Jika kamu belum membuat CreateDialog, kamu bisa buat nanti (mirip EditDialog tapi kosong)
// import { CreateOrganizationDialog } from "@/components/admin/dialog/CreateOrganizationDialog";

export const CorporateManageOrganizations = () => {
  const queryClient = useQueryClient();
  
  // --- 1. STATE MANAGEMENT ---
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); 
  
  // State Dialogs
  const [isAddOpen, setIsAddOpen] = useState(false); // Untuk Create
  
  const [isViewOpen, setIsViewOpen] = useState(false); // Untuk View Detail
  const [viewId, setViewId] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false); // Untuk Edit
  const [editItem, setEditItem] = useState(null); // Object lengkap utk diedit

  // --- 2. GET DATA (Query) ---
  const { data: result, isLoading: loadingData } = useQuery({
    queryKey: ["admin-organizations", search, typeFilter], 
    queryFn: () => OrganizationService.getMyOrganizations({ search, type: typeFilter }),
    keepPreviousData: true, // Biar gak flickering pas ngetik search
  });

  const organizations = Array.isArray(result) ? result : (result?.data || []);

  // --- 3. STATISTIK DATA (Client Side Calculation) ---
  const stats = {
    total: organizations.length,
    companies: organizations.filter(o => o.type === 'company').length,
    universities: organizations.filter(o => o.type === 'university').length,
    communities: organizations.filter(o => o.type === 'community').length,
    goverments: organizations.filter(o => o.type === 'government').length,
  };

  // --- 4. DELETE MUTATION ---
  const deleteMutation = useMutation({
    mutationFn: OrganizationService.deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      alert("Organization deleted successfully!");
    },
    onError: (err) => {
        console.error(err);
        alert("Gagal menghapus data. Pastikan data tidak sedang digunakan.");
    }
  });

  // --- 5. HANDLERS ---
  const handleView = (id) => {
    setViewId(id);
    setIsViewOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item); // Simpan object full biar form langsung keisi
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this organization? This action cannot be undone.")) {
        deleteMutation.mutate(id);
    }
  };

  // --- RENDER ---
  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* SECTION A: STATISTICS CARDS */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.total}</div>
                <p className="text-xs text-muted-foreground">All organizations</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Briefcase className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.companies}</div>
                <p className="text-xs text-muted-foreground">Corporate partners</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Universities</CardTitle>
                <GraduationCap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.universities}</div>
                <p className="text-xs text-muted-foreground">Campuses</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Communities</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.communities}</div>
                <p className="text-xs text-muted-foreground">Groups & NGOs</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goverments</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.goverments}</div>
                <p className="text-xs text-muted-foreground">Government agencies</p>
            </CardContent>
        </Card>
      </div>

      {/* SECTION B: HEADER, SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Organizations</h1>
           <p className="text-muted-foreground">Manage partners, companies, universities, and communities.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        

           {/* Search Input */}
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search name..."
                  className="pl-9 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
           </div>

           {/* Add Button */}
           <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
               <Plus className="mr-2 h-4 w-4" /> Add New
           </Button>
        </div>
      </div>

      {/* SECTION C: TABLE */}
      {loadingData ? (
        <div className="flex justify-center py-20 bg-white rounded-lg border">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
                <span className="text-sm text-muted-foreground">Loading data...</span>
            </div>
        </div>
      ) : (
        <OrganizationTable 
            organizations={organizations} 
            onView={handleView} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
        />
      )}

      {/* SECTION D: DIALOGS */}
      
      {/* 1. Detail Dialog (View) */}
      <OrganizationDetailDialog 
         open={isViewOpen}
         onOpenChange={(val) => {
             setIsViewOpen(val);
             if(!val) setViewId(null);
         }}
         // Cari object berdasarkan ID viewId
         organization={organizations.find(o => o.id === viewId)}
      />

      {/* 2. Edit Dialog */}
      <EditOrganizationDialog 
         open={isEditOpen}
         onOpenChange={(val) => {
             setIsEditOpen(val);
             if(!val) setEditItem(null);
         }}
         organization={editItem} // Kirim object lengkap
      />

      {/* 3. Create Dialog (Nanti dibuat) */}
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