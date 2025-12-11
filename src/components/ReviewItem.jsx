import { Edit, MessageSquareWarning, Star, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

function ReviewItem({
    userName = "Anonymous",
    rating = 5.0,
    comment = "Lorem Ipsum Dolor Sit Amet",
    editable = false,
}) {
    return (
        <article className="border rounded-xl p-4 bg-muted">
            
            {/* Header */}
            <div className="w-full flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-lg">{userName}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Star size={24} fill="currentColor" stroke="3"/>
                    <p className="font-medium">{rating}</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 border rounded-lg bg-card">
                <p>{comment}</p>
            </div>

            {/* Action Footer */}
            <div className="mt-2 flex flex-row gap-2">
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