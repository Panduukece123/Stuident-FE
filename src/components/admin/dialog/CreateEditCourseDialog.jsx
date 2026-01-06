import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateEditCourseDialog = ({ open, onOpenChange, onSave, course, saving }) => {
  const [preview, setPreview] = useState(null);

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      type: "course",
      instructor: "",
      level: "beginner",
      duration: "",
      price: 0,
      access_type: "free",
      certificate_url: "",
      video_url: "",
      video_duration: "",
    },
  });

  // Perhatikan nilai watch untuk Select dan Image preview
  const watchType = watch("type");
  const watchLevel = watch("level");
  const watchAccess = watch("access_type");

  // Reset form saat dialog buka/tutup atau course berubah
  useEffect(() => {
    if (open) {
      if (course) {
        reset({
          ...course,
          price: Number(course.price),
          image: null, // Reset file input
        });
      } else {
        reset({
          title: "", category: "", description: "", type: "course",
          instructor: "", level: "beginner", duration: "", price: 0,
          access_type: "free", certificate_url: "", video_url: "", video_duration: "",
          image: null
        });
      }
      setPreview(null);
    }
  }, [course, open, reset]);

  // Handler untuk file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handler Submit
  const onSubmit = (data) => {
    const submitData = { ...data };
    
    // Jika update dan tidak ganti gambar, hapus key image
    if (course && !data.image) {
      delete submitData.image;
    }

    onSave(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{course ? "Edit Course" : "Create Course"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2 mt-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Course Title</label>
              <Input 
                {...register("title", { required: "Title wajib diisi" })} 
                placeholder="e.g. Mastering React"
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
            </div>

            {/* Image */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Thumbnail Image</label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              {preview ? (
                <img src={preview} className="mt-2 w-32 aspect-video object-cover rounded border" alt="Preview" />
              ) : course?.image && (
                <img src={course.image} className="mt-2 w-32 aspect-video object-cover rounded border opacity-50" alt="Current" />
              )}
              {!course && !preview && <span className="text-xs text-amber-600 italic">Thumbnail wajib diunggah untuk kursus baru</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input placeholder="Category" {...register("category", { required: "Kategori wajib diisi" })} />
              </div>
              <div className="space-y-1">
                <Input placeholder="Instructor" {...register("instructor", { required: "Instruktur wajib diisi" })} />
              </div>
            </div>

            <div className="space-y-1">
              <Textarea placeholder="Description" {...register("description", { required: "Deskripsi wajib diisi" })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Duration (e.g. 3 Hours)" {...register("duration", { required: "Durasi wajib diisi" })} />
              <Input placeholder="Price" type="number" {...register("price")} />
            </div>

            <Input placeholder="Certificate Link" {...register("certificate_url")} />
            
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Video URL" {...register("video_url", { required: "Video URL wajib diisi" })} />
              <Input placeholder="Video Duration" {...register("video_duration")} />
            </div>

            {/* Selects menggunakan Controller manual karena shadcn Select tidak support ref register langsung */}
            <div className="grid grid-cols-3 gap-2">
              <Select value={watchType} onValueChange={(v) => setValue("type", v)}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="bootcamp">Bootcamp</SelectItem>
                </SelectContent>
              </Select>

              <Select value={watchLevel} onValueChange={(v) => setValue("level", v)}>
                <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={watchAccess} onValueChange={(v) => setValue("access_type", v)}>
                <SelectTrigger><SelectValue placeholder="Access" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : course ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCourseDialog;