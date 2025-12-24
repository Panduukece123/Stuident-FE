import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader2, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import ReviewItem from "@/components/ReviewItem";
import { useState } from "react";
import reviewService from "@/services/ReviewService";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";

const schemaRating = z.object({
  rating: z.coerce.number().int().min(1, "Nilai wajib diisi").max(5, "Nilai maksimal 5"),
  comment: z.string().min(1, "Komentar wajib diisi"),
});

export const TabReview = ({ course, user, onReviewModified }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaRating),
    defaultValues: { rating: "", comment: "" },
  });

  const onSubmitRating = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        reviewable_type: "App\\Models\\Course",
        reviewable_id: course.id,
        rating: data.rating,
        comment: data.comment,
      };
      await reviewService.createReview(payload);
      reset(); // Reset form
      Swal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        iconColor: "#4c74ff",
        title: "Ulasan berhasil dibuat!",
        color: "#fff",
        background: "#074799",
      });
      if (onReviewModified) await onReviewModified(); // Memanggi fetchData

    } catch (error) {
      
      console.error("Submit ulasan gagal:", error);
      
      // Server/API error
      if (error.response && error.response.status === 422) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, { type: "server", message: serverErrors[key] });
        });
      } else {
        alert("Terjadi kesalahan sistem.");
      }
      
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-4 md:p-8 rounded-t-none border-t-0 shadow-none">
      {/* Create Review */}
      {user ? (
        <form onSubmit={handleSubmit(onSubmitRating)} className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Buatkan Ulasan</h1>

          <div className="w-full flex items-center gap-3 mb-4">
            <Label htmlFor={"rating"}>Pilih bintang ulasan: </Label>

            {/* NOTA: Select dibungkus dengan react-hook-form Controller untuk menangkap nilai langsung. TODO: Another Fix? */}
            <Controller
              name="rating"
              control={ control }
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value?.toString()}>
                  <SelectTrigger className={errors.rating ? "border-red-500 w-40" : "w-40"}>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>

                  <SelectContent>
                    {/* Auto map 1-5 ratings */}
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex gap-1">
                          {Array(num)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" className="text-yellow-500" />
                            ))}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.rating && (
              <span className="text-sm text-red-500 font-medium">
                {errors.rating.message}
              </span>
            )}
          </div>

          <Textarea
            id="comment"
            className={errors.comment ? "border-red-500" : ""}
            placeholder="Tulis detail ulasan kamu di sini..."
            {...register("comment")}
          />
          {errors.comment && (
            <span className="text-sm text-red-500 font-medium">
              {errors.comment.message}
            </span>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4"
          >
            {isSubmitting && <Loader2 className="mr-2 animate-spin"/>}
            Kirim ulasan
          </Button>

          {errors.error && (
            <Item variant="outline" size="sm" className="bg-red-50 text-red-500 border-red-500 mt-4">
              <ItemMedia variant="icon" className="bg-red-100 border-red-400">
                <AlertCircle/>
              </ItemMedia>
              <ItemContent>
                {errors.error.message}
              </ItemContent>
            </Item>
          )}
        </form>
      ) : (
        <div className="bg-neutral-50 p-6 rounded-lg text-center mb-4 border">
          <p className="mb-2">
            Anda belum login. Silahkan login untuk memberikan ulasan.
          </p>
          <Button variant="outline" asChild>
            <Link to="/login">Login Sekarang</Link>
          </Button>
        </div>
      )}

      {/* Reviews */}
      <section>
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          Ulasan ({course.reviews?.length || 0})
        </h1>
        <div className="space-y-4">
          {course.reviews?.length > 0 ? (
            course.reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                editable={user?.name === review.user.name}
                onSuccess={onReviewModified}
              />
            ))
          ) : (
            <p className="text-muted-foreground italic">
              Belum ada ulasan untuk kursus ini.
            </p>
          )}
        </div>
      </section>
    </Card>
  );
};
