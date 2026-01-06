import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Import komponen Select (Pastikan path-nya sesuai project kamu)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// Components
import { UserTable } from "@/components/admin/table/UserTable";
import { CreateUserDialog } from "@/components/admin/dialog/CreateUserDialog";
import { EditUserDialog } from "@/components/admin/dialog/EditUserDialog";
import { UserDetailDialog } from "@/components/admin/dialog/UserDetailDialog";
import { UserStats } from "@/components/admin/UserStats";
import UserService from "@/services/admin/UserService";

export const ManageUsers = () => {
  const queryClient = useQueryClient();

  // --- STATE ---
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // State baru untuk filter role

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewUserId, setViewUserId] = useState(null);

  // --- EFFECT ---
  // Reset page ke 1 jika Search berubah ATAU Role Filter berubah
  useEffect(() => {
    setPage(1);
  }, [search, roleFilter]);

  // --- QUERIES ---
  const {
    data: apiResponse,
    isLoading: loadingUsers,
    isPlaceholderData,
  } = useQuery({
    // Masukkan roleFilter ke queryKey agar auto-refetch
    queryKey: ["admin-users", page, search, roleFilter],
    
    // Kirim semua parameter ke service
    queryFn: () => UserService.getUsers({ page, search, role: roleFilter }),
    
    placeholderData: keepPreviousData,
  });

  // Extract data & meta
  const users = apiResponse?.data || [];
  const meta = apiResponse?.meta || {};

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["admin-users-stats"],
    queryFn: UserService.getStatistics,
  });

  // --- MUTATIONS ---
  const invalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
  };

  const createMutation = useMutation({
    mutationFn: UserService.createUser,
    onSuccess: () => {
      invalidateUsers();
      setIsAddOpen(false);
      alert("User created successfully!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      invalidateUsers();
      setIsEditOpen(false);
      setEditingUser(null);
      alert("User updated successfully!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      invalidateUsers();
      alert("User deleted successfully!");
    },
  });

  const suspendMutation = useMutation({
    mutationFn: UserService.suspendUser,
    onSuccess: () => {
      invalidateUsers();
      alert("User suspended.");
    },
  });

  const activateMutation = useMutation({
    mutationFn: UserService.activateUser,
    onSuccess: () => {
      invalidateUsers();
      alert("User activated.");
    },
  });

  // --- HANDLERS ---
  const handleCreateSubmit = (formData) => createMutation.mutate(formData);
  const handleEditSubmit = (formData) => {
    if (editingUser)
      updateMutation.mutate({ id: editingUser.id, data: formData });
  };
  const handleView = (id) => {
    setViewUserId(id);
    setIsViewOpen(true);
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };
  const handleSuspend = (id) => {
    if (confirm("Suspend user?")) suspendMutation.mutate(id);
  };
  const handleActivate = (id) => {
    if (confirm("Activate user?")) activateMutation.mutate(id);
  };
  const handleDelete = (id) => {
    if (confirm("Delete permanently?")) deleteMutation.mutate(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. STATISTIK */}
      <UserStats stats={stats} isLoading={loadingStats} />

      {/* 2. HEADER, SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage your platform users and mentors.
          </p>
        </div>

        {/* Action Bar: Search, Filter, Add Button */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name/email..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Filter Dropdown */}
          <div className="w-full md:w-[150px]">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Button */}
          <Button
            onClick={() => setIsAddOpen(true)}
            className="w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {/* 3. TABLE */}
      {loadingUsers ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <UserTable
            users={users}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSuspend={handleSuspend}
            onActivate={handleActivate}
          />

          {/* 4. PAGINATION */}
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="text-sm text-muted-foreground">
              Page {meta?.halaman_sekarang || 1} of{" "}
              {meta?.halaman_terakhir || 1} (Total: {meta?.total || 0})
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1 || loadingUsers}
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
                  loadingUsers
                }
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* 5. DIALOGS */}
      <CreateUserDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleCreateSubmit}
        isLoading={createMutation.isPending}
      />
      <EditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        userToEdit={editingUser}
        onSave={handleEditSubmit}
        isLoading={updateMutation.isPending}
      />
      <UserDetailDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        userId={viewUserId}
      />
    </div>
  );
};