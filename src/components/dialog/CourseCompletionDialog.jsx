import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Star, Loader2, PartyPopper, CheckCircle2 } from "lucide-react";
import reviewService from "@/services/ReviewService";
import Swal from "sweetalert2";

export const CourseCompletionDialog = ({
  open,
  onOpenChange,
  courseId,
  courseTitle,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Silakan pilih rating terlebih dahulu");
      return;
    }
    if (!comment.trim()) {
      setError("Silakan tulis ulasan Anda");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        reviewable_type: "App\\Models\\Course",
        reviewable_id: courseId,
        rating: rating,
        comment: comment,
      };

      await reviewService.createReview(payload);

      Swal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        iconColor: "#4c74ff",
        title: "Ulasan berhasil dikirim!",
        color: "#fff",
        background: "#074799",
      });

      // Reset form
      setRating(0);
      setComment("");
      onOpenChange(false);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Submit review gagal:", err);
      if (err.response?.status === 422) {
        setError(err.response.data.message || "Validasi gagal/Anda sudah pernah memberikan ulasan untuk kursus ini");
      } else if (err.response?.status === 409) {
        setError("Anda sudah pernah memberikan ulasan untuk kursus ini");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setRating(0);
    setComment("");
    setError("");
    onOpenChange(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
            <PartyPopper className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Selamat! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Anda telah menyelesaikan kursus <span className="font-semibold text-primary">"{courseTitle}"</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Success Message */}
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">
              Sertifikat Anda sudah tersedia di halaman kursus!
            </p>
          </div>

          {/* Rating Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Berikan Rating:</Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 1 && "Sangat Buruk"}
                {rating === 2 && "Buruk"}
                {rating === 3 && "Cukup"}
                {rating === 4 && "Bagus"}
                {rating === 5 && "Sangat Bagus!"}
              </p>
            )}
          </div>

          {/* Comment Section */}
          <div className="space-y-2">
            <Label htmlFor="review-comment" className="text-base font-medium">
              Tulis Ulasan:
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagikan pengalaman belajar Anda di kursus ini..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Lewati
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Kirim Ulasan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
