import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import ArticleService from "@/services/corporate/ArticleService"; // Import Service

export function EditArticleDialog({ open, onOpenChange, articleId, onSave, isLoading: isSaving }) {
  
  // 1. FETCH DATA DETAIL (Supaya muncul di Network Tab)
  const { data: result, isLoading: isLoadingData } = useQuery({
    queryKey: ["article-detail", articleId],
    queryFn: () => ArticleService.getArticleDetail(articleId),
    enabled: !!articleId && open, // Fetch hanya jika ID ada DAN dialog terbuka
    staleTime: 0, // Selalu anggap data basi biar fetch ulang (opsional)
  });

  // State Form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    image: null, // Untuk file baru
  });
  
  // State Preview Image (opsional, biar keren UI nya)
  const [previewImage, setPreviewImage] = useState(null);

  // 2. POPULATE FORM SAAT DATA DARI API MASUK
  useEffect(() => {
    if (result) {
      // Sesuaikan pembungkus data dari backend (biasanya response.data.data atau response.data)
      const data = result.data || result; 

      setFormData({
        title: data.title || "",
        category: data.category || "",
        content: data.content || "",
        author: data.author || "", // Pastikan field ini ada
        image: null, // Reset image file input
      });

      // Jika ada gambar lama dari backend, set preview
      if (data.image) {
        setPreviewImage(data.image); // Asumsi backend kirim URL full
      }
    }
  }, [result]);

  // Handle Input Text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Input File (Gambar)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file)); // Preview lokal sebelum upload
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Kirim ke parent
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
        </DialogHeader>

        {/* TAMPILKAN LOADING SAAT MENGAMBIL DATA DETAIL */}
        {isLoadingData ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">Mengambil data artikel...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <Input name="category" value={formData.category} onChange={handleChange} className="col-span-3" required />
            </div>
            
            {/* Author */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Author</Label>
              <Input name="author" value={formData.author} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Image</Label>
              <div className="col-span-3 space-y-2">
                 {previewImage && (
                    <img src={previewImage} alt="Preview" className="h-24 w-auto object-cover rounded border" />
                 )}
                 <Input type="file" onChange={handleFileChange} accept="image/*" />
                 <p className="text-xs text-muted-foreground">Biarkan kosong jika tidak ingin mengubah gambar.</p>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Content</Label>
              <Textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                className="col-span-3" 
                rows={6} 
                required 
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                ) : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}