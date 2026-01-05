import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";

// Services
import ScholarshipService from "@/services/corporate/ScholarshipService";

// Components
import { ScholarshipStats } from "@/components/corporate/ScholarshipStats";
import { ScholarshipTable } from "@/components/corporate/table/ScholarshipTable";
import { CreateScholarshipDialog } from "@/components/corporate/dialog/CreateScholarshipDialog";
import { EditScholarshipDialog } from "@/components/corporate/dialog/EditScholarshipDialog";
import { ViewScholarshipDialog } from "@/components/corporate/dialog/ViewScholarshipDialog";

export const ManageScholarships = () => {
  const queryClient = useQueryClient();
  // user.id tidak kita pakai untuk organization_id lagi
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // --- STATE ---
  const [search, setSearch] = useState("");
  
  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  // Selected Data
  const [editingItem, setEditingItem] = useState(null);
  const [viewItemId, setViewItemId] = useState(null);

  // --- QUERIES ---
  const { data: result, isLoading: loadingData } = useQuery({
    queryKey: ["corporate-scholarships"],
    queryFn: ScholarshipService.getScholarships,
  });

  const scholarships = result?.data || [];

  // Hitung Stats
  const stats = {
    total: scholarships.length,
    active: scholarships.filter(s => s.status === 'open').length,
    closed: scholarships.filter(s => s.status === 'closed').length,
    applicants: scholarships.reduce((acc, curr) => acc + (curr.applicants_count || 0), 0)
  };

  // --- MUTATIONS ---
  
  // 1. Create (SUDAH DIPERBAIKI)
  const createMutation = useMutation({
    mutationFn: (formData) => {
        // JANGAN TIMPA organization_id DENGAN user.id
        const payload = {
            ...formData,
            organization_id: parseInt(formData.organization_id), // Convert string ID dari dropdown ke Integer
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
    }
  });

  // 2. Update
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => ScholarshipService.updateScholarship(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporate-scholarships"] });
      setIsEditOpen(false);
      setEditingItem(null);
      alert("Beasiswa berhasil diperbarui!");
    },
  });

  // 3. Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => ScholarshipService.deleteScholarship(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporate-scholarships"] });
      alert("Beasiswa berhasil dihapus.");
    },
  });

  // --- HANDLERS ---

  const handleCreateSubmit = (formData) => {
    createMutation.mutate(formData);
  };

  const handleEditSubmit = (formData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus beasiswa ini? Data pelamar juga akan terhapus.")) {
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

  // Filter Logic
  const filteredData = scholarships.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. STATISTIK */}
      <ScholarshipStats stats={stats} />

      {/* 2. HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">Manajemen Beasiswa</h1>
          <p className="text-muted-foreground">Kelola program beasiswa, pantau status, dan lihat pelamar.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari beasiswa..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Buat Baru
          </Button>
        </div>
      </div>

      {/* 3. TABLE */}
      {loadingData ? (
        <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>
      ) : (
        <ScholarshipTable 
            data={filteredData} 
            onView={handleView}       
            onEdit={handleEdit}        
            onDelete={handleDelete}    
        />
      )}

      {/* 4. DIALOG CREATE */}
      <CreateScholarshipDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleCreateSubmit}
        isLoading={createMutation.isPending}
      />

      {/* 5. DIALOG EDIT */}
      <EditScholarshipDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        itemToEdit={editingItem}
        onSave={handleEditSubmit}
        isLoading={updateMutation.isPending}
      />

      {/* 6. DIALOG VIEW DETAIL */}
      <ViewScholarshipDialog 
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        scholarshipId={viewItemId}
      />

    </div>
  );
};