import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search } from "lucide-react";
import CourseService from "@/services/admin/CourseService";
import CreateEditCourseDialog from "@/components/admin/dialog/CreateEditCourseDialog";
import CourseTable from "@/components/admin/table/CourseTable";
import { CourseViewDialog } from "@/components/admin/dialog/CourseDialogs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await CourseService.getCourses();
      setCourses(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

 const handleSave = async (courseData) => {
    setSaving(true);
    try {
      const formData = new FormData();
      
      // Mengonversi objek data dari React Hook Form ke FormData
      Object.keys(courseData).forEach((key) => {
        // Pastikan hanya mengirim data yang ada nilainya
        if (courseData[key] !== null && courseData[key] !== undefined) {
          // Khusus untuk File/Blob tetap dimasukkan, sisanya dikonversi ke string oleh FormData
          formData.append(key, courseData[key]);
        }
      });

      if (editingCourse) {
        await CourseService.updateCourse(editingCourse.id, formData);
      } else {
        await CourseService.createCourse(formData);
      }

      // Refresh data dari server
      await fetchCourses();
      
      // Tutup dialog dan reset state editing
      setOpenDialog(false);
      setEditingCourse(null);
    } catch (err) {
      // Menampilkan pesan error yang lebih spesifik jika ada dari server
      const errorMsg = err.response?.data?.message || "Gagal menyimpan perubahan.";
      alert(errorMsg);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus kursus ini?")) return;
    try {
      await CourseService.deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Courses Management</h1>
        <div className="flex gap-4">
          <InputGroup>
            <InputGroupAddon>
              <Search size={18} />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button
            onClick={() => {
              setEditingCourse(null);
              setOpenDialog(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 border rounded-lg bg-neutral-50">
          <Loader2 className="animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        <CourseTable
          courses={courses.filter((c) =>
            c.title.toLowerCase().includes(search.toLowerCase())
          )}
          onView={(c) => {
            setEditingCourse(c);
            setOpenViewDialog(true);
          }}
          onEdit={(c) => {
            setEditingCourse(c);
            setOpenDialog(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <CreateEditCourseDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSave={handleSave}
        course={editingCourse}
        saving={saving}
      />
      <CourseViewDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        course={editingCourse}
      />
    </div>
  );
};

export default AdminCourses;
