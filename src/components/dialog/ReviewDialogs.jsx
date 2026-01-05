import reviewService from "@/services/ReviewService";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogContent,
} from "../ui/dialog";
import { Loader2, Star } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaRating = z.object({
    rating: z.coerce.number().int().min(1, "Nilai wajib diisi").max(5, "Nilai maksimal 5"),
    comment: z.string().min(1, "Komentar wajib diisi"),
});

export const DeleteReviewDialog = ({
    open,
    onOpenChange,
    targetData,
    onSuccess
}) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        try {
            await reviewService.deleteReview(targetData.id);
            if (onSuccess) await onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Gagal menghapus ulasan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Hapus Ulasan</DialogTitle>
                </DialogHeader>
                <p className="py-4 text-muted-foreground">
                    Apakah Anda yakin ingin menghapus ulasan ini? Tindakan ini tidak dapat dibatalkan!
                </p>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Hapus Sekarang
                    </Button>
                </DialogFooter>
            </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export const EditReviewDialog = ({
    open,
    onOpenChange,
    initialData,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaRating),
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    useEffect(() => {
        if (open && initialData) {
            reset({
                rating: initialData.rating,
                comment: initialData.comment,
            });
        }
    }, [open, initialData, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await reviewService.updateReview(initialData.id, data);
            if (onSuccess) await onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Gagal update ulasan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Ubah Review</DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        {/* ID ditambahkan untuk bisa diakses tombol di luar tag form */}
                        <form id="edit-review-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full flex items-center gap-3 mb-4">

                                <Label htmlFor="rating">Bintang ulasan: </Label>

                                {/* NOTA: Select dibungkus dengan react-hook-form Controller untuk menangkap nilai langsung. TODO: Another Fix? */}
                                <Controller
                                    name="rating"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value?.toString()}
                                        >
                                            <SelectTrigger
                                                id="rating"
                                                className={errors.rating ? "border-red-500 w-40" : "w-40"}
                                            >
                                                <SelectValue placeholder="Pilih Rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        <div className="flex gap-1">
                                                            {Array(num).fill(0).map((_, i) => (
                                                                <Star key={i} size={14} fill="currentColor" className="text-yellow-500" />
                                                            ))}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {/* 
                                TODO: Add error text?
                                Should be impossible because ratings are already applied and cannot choose other else, unless something happened...
                                */}
                            </div>

                            <Textarea
                                id="comment"
                                placeholder="Tulis ulasan kamu..."
                                className={errors.comment ? "border-red-500 min-h-[100px]" : "min-h-[100px]"}
                                {...register("comment")}
                            />
                            {errors.comment && (
                                <p className="text-sm text-red-500 font-medium mt-1">
                                    {errors.comment.message}
                                </p>
                            )}

                        </form>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            form="edit-review-form"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};