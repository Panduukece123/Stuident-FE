import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Search } from "lucide-react";
import CourseService from "@/services/admin/CourseService";
import CreateEditCourseDialog from "@/components/admin/dialog/CreateEditCourseDialog";
import CourseTable from "@/components/admin/table/CourseTable";
import { CourseViewDialog } from "@/components/admin/dialog/CourseDialogs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // TODO for custom delete dialog
  const [openViewDialog, setOpenViewDialog] = useState(false);
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

  // View course details (by: Zidan)
  const handleView = (course) => {
    setEditingCourse(course);
    setOpenViewDialog(true);
  };

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
        <div>
          <h1 className="text-xl font-medium tracking-tight text-neutral-800">Courses Management</h1>
          <p className="text-muted-foreground">List and manage all courses.</p>
        </div>
        <div className="flex flex-row gap-2 md:gap-4 items-center">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search"
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
            <Plus/>
            Add A Course
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center w-full p-4 border border-neutral-200 rounded-sm bg-neutral-50 text-center">
          <Loader2 className="mr-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <CourseTable
          courses={filteredCourses}
          onView={handleView}
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
      <CourseViewDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        course={editingCourse}
      />
    </div>
  );
};

export default AdminCourses;
