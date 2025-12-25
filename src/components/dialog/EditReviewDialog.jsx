import reviewService from "@/services/ReviewService";
import { useEffect, useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const EditReviewDialog = ({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        rating: initialData.rating,
        comment: initialData.comment,
      });
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await reviewService.updateReview(initialData.id, formData);
      } else {
        await reviewService.createReview(formData);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Review</DialogTitle>
        </DialogHeader>

        <div className="">
          <form className="mb-4">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">
              Buatkan Ulasan
            </h1>

            <div className="w-full flex items-center gap-3 mb-4">
              <Label htmlFor={"rating"}>Pilih bintang ulasan: </Label>

              <Select>
                <SelectTrigger className="w-40">
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
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              id="comment"
              placeholder="Tulis detail ulasan kamu di sini..."
            />

            <Button type="submit" className="block w-fit mt-4">
              Kirim ulasan
            </Button>
          </form>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
