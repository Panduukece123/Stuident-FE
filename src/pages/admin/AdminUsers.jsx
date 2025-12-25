import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";

// Components
import { UserTable } from "@/components/admin/table/UserTable";
import { CreateUserDialog } from "@/components/admin/dialog/CreateUserDialog";
import { EditUserDialog } from "@/components/admin/dialog/EditUserDialog"; // Import Dialog Edit Baru
import { UserDetailDialog } from "@/components/admin/dialog/UserDetailDialog";
import { UserStats } from "@/components/admin/UserStats";
import UserService from "@/services/admin/UserService";

export const ManageUsers = () => {
  const queryClient = useQueryClient();
  
  // State Search
  const [search, setSearch] = useState("");
  
  // State Dialog Add (Create)
  const [isAddOpen, setIsAddOpen] = useState(false);

  // State Dialog Edit (Update)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // State Dialog View Detail
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewUserId, setViewUserId] = useState(null);

  // --- QUERIES ---
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: UserService.getUsers,
  });

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["admin-users-stats"],
    queryFn: UserService.getStatistics,
  });

  // --- MUTATIONS ---
  
  // 1. Create User
  const createMutation = useMutation({
    mutationFn: UserService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
      setIsAddOpen(false); // Tutup dialog Add
      alert("User created successfully!");
    },
  });

  // 2. Update User
  const updateMutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setIsEditOpen(false); // Tutup dialog Edit
      setEditingUser(null);
      alert("User updated successfully!");
    },
  });

  // 3. Delete, Suspend, Activate (Sama seperti sebelumnya)
  const deleteMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
      alert("User deleted successfully!");
    },
  });

  const suspendMutation = useMutation({
    mutationFn: UserService.suspendUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
      alert("User suspended.");
    },
  });

  const activateMutation = useMutation({
    mutationFn: UserService.activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
      alert("User activated.");
    },
  });

  // --- HANDLERS ---

  // Handle Save untuk CREATE
  const handleCreateSubmit = (formData) => {
    createMutation.mutate(formData);
  };

  // Handle Save untuk EDIT
  const handleEditSubmit = (formData) => {
    if (editingUser) {
      // Kita butuh ID dari state editingUser, dan data baru dari form
      updateMutation.mutate({ id: editingUser.id, data: formData });
    }
  };

  // Buka Dialog View
  const handleView = (id) => {
    setViewUserId(id);
    setIsViewOpen(true);
  };

  // Buka Dialog Edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditOpen(true); // Buka dialog Edit khusus
  };

  // Delete, Suspend, Activate Handlers
  const handleSuspend = (id) => {
    if (confirm("Suspend this user? They won't be able to login.")) {
      suspendMutation.mutate(id);
    }
  };

  const handleActivate = (id) => {
    if (confirm("Activate this user?")) {
      activateMutation.mutate(id);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Delete permanently?")) {
      deleteMutation.mutate(id);
    }
  };

  // Filter Logic
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. STATISTIK */}
      <UserStats stats={stats} isLoading={loadingStats} />

      {/* 2. HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">Users Management</h1>
          <p className="text-muted-foreground">List of all registered users, mentors, corporates, and admins.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Tombol Add buka isAddOpen */}
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {/* 3. TABLE */}
      {loadingUsers ? (
        <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
      ) : (
        <UserTable 
            users={filteredUsers} 
            onView={handleView}       
            onEdit={handleEdit}        
            onDelete={handleDelete}    
            onSuspend={handleSuspend} 
            onActivate={handleActivate} 
        />
      )}

      {/* 4. DIALOG CREATE (Hanya untuk Add) */}
      <CreateUserDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleCreateSubmit} // Panggil handler create
        isLoading={createMutation.isPending}
        // userToEdit dihapus dari sini karena ini khusus Add
      />

      {/* 5. DIALOG EDIT (Hanya untuk Edit - BARU) */}
      <EditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        userToEdit={editingUser} // Data user yg mau diedit
        onSave={handleEditSubmit} // Panggil handler update
        isLoading={updateMutation.isPending}
      />

      {/* 6. DIALOG VIEW DETAIL */}
      <UserDetailDialog 
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        userId={viewUserId}
      />

    </div>
  );
};