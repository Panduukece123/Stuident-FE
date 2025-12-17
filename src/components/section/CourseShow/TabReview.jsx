import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import ReviewItem from "@/components/ReviewItem";

export const CourseReviews = ({ reviews, user }) => (
  <Card className="p-4 md:p-8 rounded-t-none border-t-0 shadow-none">
    {user ? (
      <section className="flex flex-col gap-4 mb-10">
        <h1 className="text-xl md:text-2xl font-semibold">Buatkan Ulasan</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm">Pilih bintang:</p>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  <div className="flex gap-1">
                    {Array(num).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder="Tulis detail ulasan kamu di sini..." />
        <Button className="w-fit">Kirim ulasan</Button>
      </section>
    ) : (
      <div className="bg-neutral-50 p-6 rounded-lg text-center mb-10 border border-dashed">
        <p className="mb-2">Anda belum login untuk memberikan ulasan.</p>
        <Button variant="outline" asChild><Link to="/login">Login Sekarang</Link></Button>
      </div>
    )}

    <section>
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Ulasan ({reviews?.length || 0})</h1>
      <div className="space-y-4">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={review.id}
              userName={review.user.name}
              userProfilePic={review.user.profile_photo}
              comment={review.comment}
              rating={review.rating}
              editable={user?.name === review.user.name}
            />
          ))
        ) : (
          <p className="text-muted-foreground italic">Belum ada ulasan untuk kursus ini.</p>
        )}
      </div>
    </section>
  </Card>
);