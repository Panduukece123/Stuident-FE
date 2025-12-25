import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import CourseService from "@/services/admin/CourseService";
import CreateEditCourseDialog from "@/components/admin/dialog/CreateEditCourseDialog";
import CourseTable from "@/components/admin/table/CourseTable";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch courses dari backend
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await CourseService.getCourses();
      const dataArray = Array.isArray(res) ? res : res.data ? res.data : [];
      setCourses(dataArray);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Save course (create atau update)
  const handleSave = async (courseData) => {
    setSaving(true);
    try {
      if (editingCourse) {
        const res = await CourseService.updateCourse(editingCourse.id, courseData);
        const updatedCourse = res.data || res; // pastikan ambil data
        setCourses((prev) =>
          prev.map((c) => (c.id === editingCourse.id ? updatedCourse : c))
        );
      } else {
        const res = await CourseService.createCourse(courseData);
        const newCourse = res.data || res;
        setCourses((prev) => [newCourse, ...prev]);
      }

      setEditingCourse(null);
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to save course:", err);
      alert("Failed to save course. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await CourseService.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Failed to delete course.");
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => {
            setEditingCourse(null);
            setOpenDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </div>

      {loading ? (
        <div>Loading courses...</div>
      ) : (
        <CourseTable
          courses={filteredCourses}
          onEdit={(course) => {
            setEditingCourse(course);
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
        saving={saving} // pass untuk disable submit
      />
    </div>
  );
};

export default AdminCourses;
