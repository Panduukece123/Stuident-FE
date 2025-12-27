import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"; // Tambahkan import ini

export const StudentFeedbackSection = ({ session }) => {
  const reviews = session?.reviews || [];

  if (reviews.length === 0) return null;

  return (
    // 1. Card Pembungkus Utama (Cuma 1)
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <MessageCircle className="w-4 h-4" /> Feedback dari Student ({reviews.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* 2. Looping data di sini */}
        {reviews.map((review, index) => (
          <div key={review.id}>
            
            {/* Isi Review */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-white shadow-sm hidden md:block">
                <AvatarImage src={review.user?.avatar} />
                <AvatarFallback>{review.user?.name?.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-neutral-900">
                    {review.user?.name}
                  </p>
                  <span className="text-xs text-neutral-400">
                    {new Date(review.created_at).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-neutral-600 font-medium">
                    ({review.rating}/5)
                  </span>
                </div>

                <p className="text-sm text-neutral-700 mt-2 italic leading-relaxed">
                  {review.comment ? (
                    `"${review.comment}"`
                  ) : (
                    <span className="text-neutral-400 not-italic text-xs">
                      (Tidak ada komentar tertulis)
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* 3. Logic Separator: Munculkan garis KECUALI di item terakhir */}
            {index < reviews.length - 1 && (
                <Separator className="my-6 bg-neutral-200" />
            )}
            
          </div>
        ))}
      </CardContent>
    </Card>
  );
};