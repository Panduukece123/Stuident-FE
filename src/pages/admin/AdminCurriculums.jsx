import * as React from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import CurriculumTable from "@/components/admin/table/CurriculumTable";
import CurriculumService from "@/services/admin/CurriculumService";
import courseService from "@/services/CourseService";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowLeft, Loader2, Plus, SearchIcon } from "lucide-react";
import { CurriculumDeleteDialog, CurriculumDialog, CurriculumViewDialog } from "@/components/admin/dialog/CurriculumDialogs";

const AdminCurriculumCourse = () => {
    const { id } = useParams();

    const [course, setCourse] = React.useState({});
    const [curriculums, setCurriculums] = React.useState([]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openViewDialog, setOpenViewDialog] = React.useState(false);
    
    const [editCurriculum, setEditCurriculum] = React.useState(null); // null = new

    const [isLoading, setIsLoading] = React.useState(false);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const courseData = await courseService.showCourse(id);
            const curriculumData = await courseService.getCurriculum(id);
            setCurriculums(curriculumData.data || curriculumData);
            setCourse(courseData.data || courseData);
        } catch (error) {
            console.error("Failed to fetch curriculums:", error);
            setCurriculums([]);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const handleView = (curriculum) => {
        setEditCurriculum(curriculum);
        setOpenViewDialog(true);
    };

    const handleEdit = (curriculum) => {
        setEditCurriculum(curriculum);
        setOpenDialog(true);
    };

    const handleDelete = (curriculum) => {
        setEditCurriculum(curriculum);
        setOpenDeleteDialog(true);
    };

    React.useEffect(() => {
        fetchData();
    }, [id, fetchData]);

    return (
        <div className="flex flex-col gap-4">
            
            {/* Action Header */}
            <div className="flex flex-row justify-between">

                {/* Details */}
                <div className="flex flex-row gap-2 md:gap-4 items-center">
                    <Button variant="outline" asChild>
                        <Link to="/admin/courses">
                            <ArrowLeft/>
                            Back
                        </Link>
                    </Button>
                    <p className="font-medium text-lg md:text-xl">
                        {isLoading ? "Loading..." : course.title}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-row gap-2 md:gap-4 items-center">
                    <InputGroup>
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Search" />
                    </InputGroup>
                    <Button
                        onClick={() => {
                            setOpenDialog(true);
                            setEditCurriculum(null);
                        }}
                    >
                        <Plus />
                        Add A Curriculum
                    </Button>
                </div>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center w-full p-4 border border-neutral-200 rounded-sm bg-neutral-50 text-center">
                    <Loader2 className="mr-4 animate-spin" />
                    Loading...
                </div>
            ) : (
                <CurriculumTable
                    curriculums={curriculums}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Dialogs */}
            <CurriculumDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                courseId={id}
                curriculum={editCurriculum}
                onFinish={fetchData}
            />
            <CurriculumDeleteDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                curriculum={editCurriculum}
                onFinish={fetchData}
            />
            <CurriculumViewDialog
                open={openViewDialog}
                onOpenChange={setOpenViewDialog}
                curriculum={editCurriculum}
            />
        </div>
    )
};

export default AdminCurriculumCourse;