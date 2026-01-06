import LevelBadge from "@/components/LevelBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import CourseService from "@/services/admin/CourseService";
import { ImageOff, Loader2 } from "lucide-react";
import { useState } from "react";

const getAccessBadgeColor = (type) => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-700 border-green-200";
      case "regular":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "premium":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
};

export const CourseDeleteDialog = ({
    open,
    onOpenChange,
    course,
    onFinish,
}) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        if (!course) return;
        setLoading(true);
        try {
            await CourseService.deleteCourse(course.id);
            if (onFinish) await onFinish();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to delete course:", error);
            alert("Failed to delete course!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent className={"[&>button:first-of-type]:hidden"}>
                    <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this course?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={loading}
                            onClick={onDelete}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
};

export const CourseViewDialog = ({
    open,
    onOpenChange,
    course,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent>
                    
                    <DialogHeader>
                        <DialogTitle>
                            Course Details
                        </DialogTitle>
                        <DialogDescription>
                            Detailed information of {course?.title}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto p-2">
                        <div>
                            <p className="text-sm font-medium">Course Title:</p>
                            <p className="text-sm">{course?.title}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Price:</p>
                            <p className="text-sm">
                                {course?.price <= 0 ? "Free" :
                                Number(course?.price).toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Instructor:</p>
                            <p className="text-sm">{course?.instructor}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Access Type:</p>
                            <Badge
                                variant="outline"
                                className={`capitalize font-medium border-0 ${getAccessBadgeColor(course?.access_type)}`}
                            >
                                {course?.access_type}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Category:</p>
                            <Badge variant="outline" className={"capitalize font-medium"}>
                                {course?.category}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Type:</p>
                            <Badge variant="outline" className={"capitalize font-medium"}>
                                {course?.type}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Level:</p>
                            <LevelBadge level={course?.level} showIcon={false} />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Course Duration:</p>
                            <p className="text-sm">{course?.duration}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Total Curriculum Duration:</p>
                            <p className="text-sm">{course?.total_curriculum_duration}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Total Videos:</p>
                            <p className="text-sm">{course?.total_videos}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Enrollments:</p>
                            <p className="text-sm">{course?.enrollments_count}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Average Rating:</p>
                            <p className="text-sm">{course?.reviews_avg_rating}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Thumbnail:</p>
                            {course?.image ? (
                                <img src={course.image} alt={course?.title} className="aspect-video rounded-md" />
                            ) : (
                                <div className="aspect-video flex items-center justify-center gap-2 bg-neutral-100 text-muted-foreground border rounded">
                                    <ImageOff />
                                    <p>No thumbnail</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium">Description:</p>
                            <p className="text-sm">{course?.description}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Overview Video Duration:</p>
                            <p className="text-sm">{course?.video_duration}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Certificate:</p>
                            {course?.certificate_url ? (
                                <a
                                    className="text-sm text-secondary underline"
                                    href={course?.certificate_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Certificate
                                </a>
                            ) : (
                                <p className="text-sm text-muted-foreground">No certificate</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
};