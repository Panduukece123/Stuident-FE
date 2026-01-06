import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, RefreshCcw, Search } from "lucide-react";
import CourseService from "@/services/admin/CourseService";
import CreateEditCourseDialog from "@/components/admin/dialog/CreateEditCourseDialog";
import CourseTable from "@/components/admin/table/CourseTable";
import { CourseDeleteDialog, CourseDialog, CourseViewDialog } from "@/components/admin/dialog/CourseDialogs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [loading, setLoading] = useState(false);

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

  const handleView = (course) => {
    setEditingCourse(course);
    setOpenViewDialog(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  const handleDelete = (course) => {
    setEditingCourse(course);
    setOpenDeleteDialog(true);
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
        <div className="flex flex-row gap-2 items-center">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSearch("");
              fetchCourses();
            }}
            title="Refresh the table"
          >
            <RefreshCcw />
          </Button>
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      
      <CourseDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        course={editingCourse}
        onFinish={fetchCourses}
      />
      <CourseViewDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        course={editingCourse}
      />
      <CourseDeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        course={editingCourse}
        onFinish={fetchCourses}
      />
    </div>
  );
};

export default AdminCourses;
