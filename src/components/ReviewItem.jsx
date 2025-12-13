import { Edit, MessageSquareWarning, Star, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const getInitials = (fullName) => {
  return fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

function ReviewItem({
    userName = "Anonymous",
    userProfilePic = "",
    rating = 5,
    comment = "Lorem Ipsum Dolor Sit Amet",
    editable = false,
}) {
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
                    <p className="text-lg">{userName}</p>
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
                <Button variant={"destructive"} size={"icon"}>
                    <MessageSquareWarning  />
                </Button>
                {editable && (
                    <Button variant={"outline"} size={"icon"}>
                        <Edit />
                    </Button>
                )}
                {editable && (
                    <Button variant={"outline"} size={"icon"}>
                        <X />
                    </Button>
                )}
            </div>
        </article>
    )
}

export default ReviewItem