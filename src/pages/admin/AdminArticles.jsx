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
  FileText,
  Tags,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Components & Services
import { ArticleTable } from "@/components/admin/table/ArticleTable";
import { CreateArticleDialog } from "@/components/admin/dialog/CreateArticleDialog";
import { EditArticleDialog } from "@/components/admin/dialog/EditArticleDialog";
import { ArticleDetailDialog } from "@/components/admin/dialog/ArticleDetailDialog";
import ArticleService from "@/services/corporate/ArticleService";

export const ManageArticles = () => {
  const queryClient = useQueryClient();

  // --- STATE ---
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // Filter Kategori

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewId, setViewId] = useState(null);

  // --- EFFECT ---
  // Reset page ke 1 saat Search atau Category berubah
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter]);

  // --- QUERY ---
  const {
    data: apiResponse,
    isLoading: loadingData,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["admin-articles", page, search, categoryFilter],
    queryFn: () =>
      ArticleService.getArticles({
        page,
        search,
        category: categoryFilter,
      }),
    placeholderData: keepPreviousData,
  });

  // Extract Data & Meta
  const articles = apiResponse?.data || [];
  const meta = apiResponse?.meta || {};

  // --- STATISTIK ---
  // Note: Total ambil dari meta backend. 
  // Categories & Authors dihitung dari data yang tampil di page ini saja.
  const stats = {
    total: meta.total || 0,
    categories: new Set(articles.map((item) => item.category)).size,
    authors: new Set(articles.map((item) => item.author)).size,
  };

  // --- MUTATIONS ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => ArticleService.updateArticle({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      setIsEditOpen(false);
      setEditingId(null);
      alert("Article updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      alert("Gagal update artikel.");
    },
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

  const handleView = (id) => {
    setViewId(id);
    setIsViewOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      deleteMutation.mutate(id);
    }
  };

  // Cari artikel untuk view detail (dari list yang ada)
  const selectedArticle = articles.find((item) => item.id === viewId);

  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* 1. STATISTIK SECTION */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingData ? "..." : stats.total}
            </div>
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
            <div className="text-2xl font-bold">
              {loadingData ? "..." : stats.categories}
            </div>
            <p className="text-xs text-muted-foreground">Unique (Page view)</p>
          </CardContent>
        </Card>

        {/* Card Authors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingData ? "..." : stats.authors}
            </div>
            <p className="text-xs text-muted-foreground">Active (Page view)</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. HEADER, SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        
        {/* Left: Title */}
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">
            Article Management
          </h1>
          <p className="text-muted-foreground">
            Manage news, blog posts, and educational content.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    
          {/* Category Filter Dropdown */}
          <div className="w-full md:w-[180px]">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="scholarship">Scholarship</SelectItem>
                <SelectItem value="testimonial">Testimonial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search title..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <Button onClick={() => setIsAddOpen(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Article
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
          <ArticleTable
            articles={articles} // Pass data langsung (sudah difilter backend)
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

      {/* 5. DIALOGS */}
      <CreateArticleDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      <EditArticleDialog
        open={isEditOpen}
        onOpenChange={(val) => {
          setIsEditOpen(val);
          if (!val) setEditingId(null);
        }}
        articleId={editingId}
        onSave={handleEditSubmit}
        isLoading={updateMutation.isPending}
      />

      <ArticleDetailDialog
        open={isViewOpen}
        onOpenChange={(val) => {
          setIsViewOpen(val);
          if (!val) setViewId(null);
        }}
        article={selectedArticle}
      />
    </div>
  );
};