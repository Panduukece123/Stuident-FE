import { Edit, MessageSquareWarning, Star, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DeleteReviewDialog, EditReviewDialog } from "./ReviewDialogs";
import { useState } from "react";

const getInitials = (fullName) => {
  return fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

function ReviewItem({
    review,
    editable = false,
    onSuccess,
}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const {
        userName = review.user?.name || "Anonymous",
        userProfilePic = review.user?.profile_photo || "",
        rating = review.rating || 5,
        comment = review.comment || "Lorem Ipsum Dolor Sit Amet",
    } = review || {};

    return (
        <article className="border rounded-xl px-4 bg-muted">
            
            {/* Header */}
            <div className="w-full flex flex-row justify-between items-center py-3">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar>
                        <AvatarImage
                            src={userProfilePic}
                            alt="user avatar"
                        />
                        <AvatarFallback>
                            { userName ? getInitials(userName) : "?"}
                        </AvatarFallback>
                    </Avatar>
                    <p className="md:text-lg">{userName}</p>
                </div>
                <div className="flex flex-row gap-2 items-center text-muted-foreground">
                    <Star size={24}/>
                    <p className="font-medium">{rating}</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 border rounded-lg bg-card">
                <p>{comment}</p>
            </div>

            {/* Action Footer */}
            <div className="flex flex-row gap-2 py-3">
                {!editable && (
                    <Button
                        variant={"destructive"}
                        size={"icon"}
                        title="Laporkan ulasan"
                    >
                        <MessageSquareWarning  />
                    </Button>
                )}
                {editable && (
                    <>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setIsEditOpen(true)}
                            title="Edit ulasan"
                        >
                            <Edit />
                        </Button>
                        <EditReviewDialog
                            open={isEditOpen}
                            onOpenChange={setIsEditOpen}
                            initialData={review}
                            onSuccess={onSuccess}
                        />
                    </>
                )}
                {editable && (
                    <>
                        <Button
                            variant={"destructive"}
                            size={"icon"}
                            onClick={() => setIsDeleteOpen(true)}
                            title="Hapus ulasan"
                        >
                            <X />
                        </Button>
                        <DeleteReviewDialog
                            open={isDeleteOpen}
                            onOpenChange={setIsDeleteOpen}
                            targetData={review}
                            onSuccess={onSuccess}
                        />
                    </>
                )}
            </div>
        </article>
    )
}

export default ReviewItem