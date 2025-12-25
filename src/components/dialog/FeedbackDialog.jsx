import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";

export const FeedbackDialog = ({ open, onOpenChange, sessionId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const feedbackMutation = useMutation({
    mutationFn: () => MentoringService.submitFeedback(sessionId, { rating, review }),
    onSuccess: () => {
      alert("Terima kasih atas feedback Anda!");
      onOpenChange(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Beri Feedback</DialogTitle>
          <DialogDescription>Bagaimana pengalaman mentoring Anda?</DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`h-8 w-8 cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea 
            placeholder="Tulis ulasan Anda di sini..." 
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button disabled={feedbackMutation.isPending || rating === 0} onClick={() => feedbackMutation.mutate()}>
            {feedbackMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Kirim Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};