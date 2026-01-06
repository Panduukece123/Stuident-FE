import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import CurriculumService from "@/services/admin/CurriculumService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const initialFormData = {
    section: "",
    section_order: 0,
    order: 0,
    title: "",
    description: "",
    duration: "",
    video_url: "",
}

const schemaCurriculum = z.object({
    section: z.string().min(1, "Nama section wajib diisi!"),
    section_order: z.coerce.number({
        required_error: "Wajib diisi!",
        invalid_type_error: "Harus berupa angka!",
    }).min(1, "Tidak boleh kurang dari 1!"),
    order: z.coerce.number({
        required_error: "Wajib diisi!",
        invalid_type_error: "Harus berupa angka!",
    }).min(1, "Tidak boleh kurang dari 1!"),
    title: z.string().min(1, "Title wajib diisi!"),
    description: z.string().min(1, "Description wajib diisi!"),
    duration: z.string().min(1, "Duration wajib diisi!"),
    video_url: z.url("Harus merupakan URL!").min(1, "Video URL wajib diisi!"),
})

export const CurriculumDeleteDialog = ({
    open,
    onOpenChange,
    curriculum,
    onFinish,
}) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        if (!curriculum) return;
        setLoading(true);
        try {
            await CurriculumService.deleteCurriculum(curriculum.id, curriculum.course_id);
            if (onFinish) await onFinish();
            onOpenChange(false);
        } catch (error) {
            console.error("Gagal melakukan aksi curriculum:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent className={"[&>button:first-of-type]:hidden"}>
                    <DialogHeader>
                        <DialogTitle>Hapus Curriculum</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus curriculum ini?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={loading}
                            onClick={onDelete}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export const CurriculumDialog = ({
    open,
    onOpenChange,
    courseId,
    curriculum,
    onFinish,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(schemaCurriculum),
        defaultValues: initialFormData
    })

    useEffect(() => {
        if (open) {
            if (curriculum) 
                reset({
                    section: curriculum.section || "",
                    section_order: curriculum.section_order ?? 0,
                    order: curriculum.order ?? 0,
                    title: curriculum.title || "",
                    description: curriculum.description || "",
                    duration: curriculum.duration || "",
                    video_url: curriculum.video_url || "",
                });
            else 
                reset(initialFormData);
        }
    }, [open, curriculum, reset]);

    const onSubmit = async (data) => {
        // console.log("Data yang akan dikirim:", data);
        setLoading(true);
        try {
            if (curriculum) {
                await CurriculumService.putCurriculum(curriculum.id, courseId, data);
            } else {
                await CurriculumService.postCurriculum(courseId, data);
            }
            if (onFinish) await onFinish();
            onOpenChange(false);
        } catch (error) {
            console.error("Gagal melakukan aksi curriculum:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                
                <DialogContent
                    className={"md:min-w-xl [&>button:first-of-type]:hidden"}
                    onInteractOutside={(e) => {e.preventDefault();}}
                >

                    <DialogHeader>
                        <DialogTitle>
                            {curriculum ? "Edit the curriculum" : "Add a curriculum"}
                        </DialogTitle>
                        <DialogDescription>
                            {curriculum ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        id="form-curriculum"
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-h-[50vh] overflow-y-auto p-2"
                    >
                        <FieldSet>
                            <FieldGroup className={"grid grid-cols-4"}>
                                <Controller
                                    name="section"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field className={"col-span-3"}>
                                            <FieldLabel>Section</FieldLabel>
                                            <Input
                                                {...field}
                                                id="section"
                                                placeholder="e.g. Chapter 1: Lorem Ipsum"
                                            />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="section_order"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Order</FieldLabel>
                                            <Input
                                                {...field}
                                                id="section_order"
                                                placeholder="e.g. 0"
                                            />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup className={"grid grid-cols-4"}>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field className={"col-span-3"}>
                                            <FieldLabel>Title</FieldLabel>
                                            <Input
                                                {...field}
                                                id="title"
                                                placeholder="e.g. Lorem Ipsum Dolor Sit Amet"
                                            />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="order"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Order</FieldLabel>
                                            <Input
                                                {...field}
                                                id="order"
                                                placeholder="e.g. 0"
                                            />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="description"
                                            placeholder="e.g. Lorem Ipsum Dolor Sit Amet"
                                        />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="duration"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Duration</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                {...field}
                                                id="duration"
                                                placeholder="e.g. 1 minutes"
                                            />
                                        </InputGroup>
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="video_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Video URL (Youtube)</FieldLabel>
                                        <Input
                                            {...field}
                                            id="video_url"
                                            placeholder="https://..."
                                        />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
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
                            form="form-curriculum"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export const CurriculumViewDialog = ({
    open,
    onOpenChange,
    curriculum,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent className={"md:min-w-xl"}>
                    
                    <DialogHeader>
                        <DialogTitle>
                            Curriculum Details
                        </DialogTitle>
                        <DialogDescription>
                            Detailed information of {curriculum?.title}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto p-2">
                        <div>
                            <p className="text-sm font-medium">Curriculum Title</p>
                            <p className="text-sm">{curriculum?.title}</p>
                            <p className="text-xs font-light">Order: {curriculum?.order}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Curriculum Section</p>
                            <p className="text-sm">{curriculum?.section}</p>
                            <p className="text-xs font-light">Order: {curriculum?.section_order}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-sm">{curriculum?.description}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Curriculum Duration</p>
                            <p className="text-sm">{curriculum?.duration}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Video</p>
                            {curriculum?.video_url ? (
                                <iframe
                                    src={curriculum?.video_url}
                                    allow="encrypted-media"
                                    allowFullScreen
                                    className="aspect-video rounded"
                                ></iframe>
                            ) : (
                                <div className="aspect-video flex items-center justify-center gap-2 bg-neutral-100 text-muted-foreground border rounded">
                                    <ImageOff />
                                    <p>No video</p>
                                </div>
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