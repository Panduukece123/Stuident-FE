import LevelBadge from "@/components/LevelBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CourseService from "@/services/admin/CourseService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const initialFormData = {
    title: "",
    image: "",
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
    video_duration: ""
};

const schemaCourse = z.object({
    title: z.string().min(1, "Title wajib diisi!").max(255, "Title maksimal 255 karakter"),
    category: z.string().min(1, "Category wajib diisi!").max(100, "Category maksimal 100 karakter"),
    description: z.string(),
    type: z.enum(["course", "bootcamp", "other"]).default("course"),
    instructor: z.string().min(1, "Instructor wajib diisi!"),
    level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
    duration: z.string().min(1, "Duration wajib diisi!"),
    price: z.coerce.number({
        required_error: "Wajib diisi!",
        invalid_type_error: "Harus berupa angka!",
    }),
    access_type: z.enum(["free", "regular", "premium"]).default("free"),
    certificate_url: z.url("Certificate URL wajib diisi!"),
    video_url: z.url("Video URL wajib diisi!"),
    video_duration: z.string().nullable().transform((val) => val ?? ""),
    // Complex validation: image
    image: z.union([
    z.instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Maksimal ukuran file 5MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Format harus .jpg, .png, atau .webp"
      ),
    z.url("Format URL tidak valid!").min(1, "Image wajib diisi"),
  ]),
})

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
            await CourseService.deleteCourse(course?.id);
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

export const CourseDialog = ({
    open,
    onOpenChange,
    course,
    onFinish,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(schemaCourse),
        defaultValues: initialFormData
    });

    useEffect(() => {
        if (open) {
            if (course)
                reset({
                    title: course.title,
                    image: course.image,
                    category: course.category,
                    description: course.description,
                    type: course.type,
                    instructor: course.instructor,
                    level: course.level,
                    duration: course.duration,
                    price: course.price,
                    access_type: course.access_type,
                    certificate_url: course.certificate_url,
                    video_url: course.video_url,
                    video_duration: course.video_duration
                });
            else
                reset(initialFormData);
        }
    }, [open, course, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Must be wrapped in Form Data since this is now a File object request
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            if (course) {
                await CourseService.updateCourse(course.id, formData);
            } else {
                await CourseService.createCourse(formData);
            }
            if (onFinish) await onFinish();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to save/update course:", error);
            alert("Failed to save/update course!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent
                    className={"w-lg! sm:w-max [&>button:first-of-type]:hidden"}
                    onInteractOutside={(e) => {e.preventDefault();}}
                >

                    <DialogHeader>
                        <DialogTitle>
                            {course ? "Update the course" : "Create a course"}
                        </DialogTitle>
                        <DialogDescription>
                            {course ? "Update the selected course" : "Create a new course"}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        id="form-course"
                        onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
                        className="max-h-[50vh] overflow-y-auto p-2"
                    >
                        <FieldSet>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Lorem Ipsum Dolor Sit Amet"
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="instructor"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Instructor</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Ahmad Zidan Ali"
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="category"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Category</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Lorem Ipsum Dolor Sit Amet"
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="type"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Type</FieldLabel>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="course">Course</SelectItem>
                                                <SelectItem value="bootcamp">Bootcamp</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="level"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Level</FieldLabel>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="beginner">Beginner</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="access_type"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Access Type</FieldLabel>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select access type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="free">Free</SelectItem>
                                                <SelectItem value="regular">Regular</SelectItem>
                                                <SelectItem value="premium">Premium</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="price"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Price</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                {...field}
                                                placeholder="999.999.999"
                                            />
                                            <InputGroupAddon>
                                                <InputGroupText>Rp.</InputGroupText>
                                            </InputGroupAddon>
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText className={"font-normal"}>,00</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="duration"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Duration</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="eg. 24 hours"
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="description"
                                            placeholder="Description is here"
                                        />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="image"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Image Thumbnail</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="https://..."
                                            type="text"
                                            value={typeof field.value === "string" ? field.value : ""}
                                        />
                                        <p className="text-sm text-muted-foreground items-center">or</p>
                                        <Input
                                            //{...field} // Cannot do this anymore because of browser's security or somethin...
                                            type="file"
                                            accept="image/*"
                                            name={field.name}
                                            onBlur={field.onBlur}
                                            // value={field.value} // DON'T. This causes error.
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) field.onChange(file);
                                            }}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="video_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Overview Video URL</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="https://..."
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="video_duration"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Overview Video Duration</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="eg. 5 minutes"
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="certificate_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Certification URL</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="https://..."
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldSet>
                    </form>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="form-course"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

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
                            <p className="text-sm">{course?.instructor}</p>
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