import * as React from "react";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import CurriculumTable from "@/components/admin/table/CurriculumTable";
import CurriculumService from "@/services/admin/CurriculumService";
import courseService from "@/services/CourseService";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { CurriculumDialog } from "@/components/admin/dialog/CreateEditCurriculumDialog";

const AdminCurriculumCourse = () => {
    const { id } = useParams();

    const [course, setCourse] = React.useState({});
    const [curriculums, setCurriculums] = React.useState([]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [editCurriculum, setEditCurriculum] = React.useState(null);

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

    React.useEffect(() => {
        fetchData();
    }, [id, fetchData]);

    return (
        <div className="flex flex-col gap-4">
            
            {/* Action Header */}
            <div className="flex flex-row justify-between">

                {/* Details */}
                <div className="flex flex-row gap-2 md:gap-4 items-center">
                    <Button asChild>
                        <Link to="/admin/courses">Back</Link>
                    </Button>
                    <p className="font-medium text-lg md:text-xl">{course.title}</p>
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
                    >Add A Curriculum</Button>
                </div>
            </div>

            {/* Table */}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <CurriculumTable
                    curriculums={curriculums}
                />
            )}

            <CurriculumDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                courseId={id}
                curriculum={editCurriculum}
                onFinish={fetchData}
            />

        </div>
    )
};

export default AdminCurriculumCourse;