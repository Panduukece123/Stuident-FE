import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Plus, Search, Loader2, FileText, Tags, Users } from "lucide-react";

// Components
import { ArticleTable } from "@/components/admin/table/ArticleTable";
import { CreateArticleDialog } from "@/components/admin/dialog/CreateArticleDialog";
import { EditArticleDialog } from "@/components/admin/dialog/EditArticleDialog";
import { ArticleDetailDialog } from "@/components/admin/dialog/ArticleDetailDialog"; // <--- IMPORT INI
import ArticleService from "@/services/corporate/ArticleService";

export const ManageArticles = () => {
  const queryClient = useQueryClient();
  
  // State Search & Add
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // State Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  // State View Detail (BARU)
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewId, setViewId] = useState(null);

  // --- 1. GET ALL ARTICLES ---
  const { data: result, isLoading: loadingData } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: ArticleService.getArticles,
  });

  const articles = Array.isArray(result) ? result : (result?.data || []);

  // --- HITUNG STATISTIK (Frontend Side) ---
  const stats = {
    total: articles.length,
    categories: new Set(articles.map(item => item.category)).size,
    authors: new Set(articles.map(item => item.author)).size, 
  };

  // --- 2. MUTATIONS ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => ArticleService.updateArticle({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      // queryClient.invalidateQueries({ queryKey: ["article-detail", editingId] }); // Refresh detail cache jika perlu
      setIsEditOpen(false);
      setEditingId(null);
      alert("Article updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      alert("Gagal update artikel.");
    }
  });

  const createMutation = useMutation({
    mutationFn: ArticleService.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      setIsAddOpen(false);
      alert("Created successfully!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ArticleService.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      alert("Deleted successfully!");
    },
  });

  // --- HANDLERS ---
  const handleEdit = (item) => {
    setEditingId(item.id); 
    setIsEditOpen(true);   
  };

  const handleEditSubmit = (formData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    }
  };

  // Handler View Detail (BARU)
  const handleView = (id) => {
    setViewId(id);
    setIsViewOpen(true);
  };

  // Filter Search
  const filteredArticles = articles.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedArticle = articles.find(item => item.id === viewId);

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. STATISTIK SECTION */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card Total */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.total}</div>
                <p className="text-xs text-muted-foreground">Uploaded articles</p>
            </CardContent>
        </Card>

        {/* Card Categories */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Tags className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.categories}</div>
                <p className="text-xs text-muted-foreground">Unique topics</p>
            </CardContent>
        </Card>

        {/* Card Authors */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Authors</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{loadingData ? "..." : stats.authors}</div>
                <p className="text-xs text-muted-foreground">Active contributors</p>
            </CardContent>
        </Card>
      </div>

      {/* 2. HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
           <h1 className="text-xl font-medium tracking-tight text-neutral-800">Article Management</h1>
           <p className="text-muted-foreground">Manage news, blog posts, and educational content.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
           <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                 placeholder="Search title..."
                 className="pl-9 bg-white"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <Button onClick={() => setIsAddOpen(true)}>
               <Plus className="mr-2 h-4 w-4" /> Add Article
           </Button>
        </div>
      </div>

      {/* 3. TABLE */}
      {loadingData ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
      ) : (
        <ArticleTable 
            articles={filteredArticles} 
            onView={handleView} // <--- SUDAH DIPASANG HANDLERNYA
            onEdit={handleEdit} 
            onDelete={(id) => deleteMutation.mutate(id)} 
        />
      )}

      {/* 4. DIALOG CREATE */}
      <CreateArticleDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      {/* 5. DIALOG EDIT */}
      <EditArticleDialog
        open={isEditOpen}
        onOpenChange={(val) => {
            setIsEditOpen(val);
            if(!val) setEditingId(null); 
        }}
        articleId={editingId} 
        onSave={handleEditSubmit}
        isLoading={updateMutation.isPending}
      />

      {/* 6. DIALOG VIEW DETAIL (BARU) */}
      <ArticleDetailDialog 
        open={isViewOpen}
        onOpenChange={(val) => {
            setIsViewOpen(val);
            if(!val) setViewId(null);
        }}

        article={selectedArticle} 
      />
    </div>
  );
};