import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronLeft, Edit, Link, MessageSquareWarning, Share, Smile, Star, User, X } from "lucide-react";
import * as React from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "react-router";
import courseService from "@/services/CourseService";

function CourseReview({
    userName = "Anonymous",
    rating = 5.0,
    comment = "Lorem Ipsum Dolor Sit Amet",
}) {
    return (
        <article className="border rounded-xl p-4 m-2">
            
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
                    <Star size={24}/>
                    <p className="font-medium">{rating}</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 border rounded-lg">
                <p>{comment}</p>
            </div>

            {/* Action Footer */}
            <div className="mt-2 flex flex-row gap-2">
                <Button variant={"outline"} size={"icon"}>
                    <MessageSquareWarning  />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                    <Edit />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                    <X />
                </Button>
            </div>
        </article>
    )
}

export default function CourseShowPage() {
    const { id } = useParams();
    const [course, setCourse] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const courseData = await courseService.showCourse(id);
            setCourse(courseData.data);
        }
        fetchData();
    }, [id]);

    const calculateTotalRating = () => {
        if (!course.reviews || course.reviews.length === 0) {
            return { ratingAverage: 0, ratingTotal: 0 };
        }
        
        let sum = 0;
        course.reviews.forEach(review => {
            const rating = typeof review.rating === 'string' 
                ? parseFloat(review.rating) // Convert to numbers from string
                : review.rating;
            sum += rating || 0;
        });
        
        const average = sum / course.reviews.length;
        return { 
            ratingAverage: average.toFixed(1), // One decimal place
            ratingTotal: course.reviews.length 
        };
    };
    const { ratingAverage, ratingTotal } = calculateTotalRating();

    return (
        <div className="max-w-7xl mx-auto p-4 py-8 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="basis-full">
                {/* Legend Page */}
                <div className="w-full flex flex-row gap-4 items-center">
                    <Button className={"rounded-full"}>
                        <ChevronLeft/>
                        Back
                    </Button>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Courses</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">{course.category}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem aria-current="page">
                                <BreadcrumbPage>{course.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                </div>

                {/* Summary Page */}
                <div className="my-4">
                    <h1 className="text-2xl md:text-3xl font-semibold w-full">
                        {course.title}
                    </h1>
                    <p className="text-base md:text-lg font-light text-muted-foreground w-full">
                        {course.description}
                    </p>
                    <div className="grid grid-cols-2 mt-4 gap-2">

                        <div className="inline-flex gap-1" id="course_summary_badge">
                            <Badge variant="default">
                                {course.level}
                                <Smile/>
                            </Badge>
                            <Badge variant="default">{course.category}</Badge>
                            <Badge variant="default">{course.type}</Badge>
                        </div>

                        <div className="inline-flex gap-1 justify-end" id="course_summary_participant">
                            <User />
                            <p id="course_summary_participant-num">1024</p>
                            <p className="text-muted-foreground font-light">pengikut</p>
                        </div>

                        <div className="inline-flex gap-1" id="course_summary_author">
                            <p className="text-muted-foreground font-light">Instruktur:</p>
                            <p id="course_summary_author-name">{course.instructor}</p>
                        </div>

                        <div className="inline-flex gap-1 justify-end" id="course_summary_review">
                            <Star />
                            <p id="course_summary_review-num">{ratingAverage}</p>
                            <p className="text-muted-foreground font-light">dari {ratingTotal} ulasan</p>
                        </div>

                    </div>
                </div>

                {/* Detail Page */}
                <Tabs defaultValue="overview">

                    {/* Tabs Selector */}
                    <TabsList className={"w-full rounded-b-none border"}>
                        <TabsTrigger value="overview">Kilasan</TabsTrigger>
                        <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
                        <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                    </TabsList>

                    {/* Tab Content: Overview-Description */}
                    <TabsContent value="overview">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Deskripsi
                            </h1>
                            <p>
                                {course.description}
                            </p>
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Curriculum */}
                    <TabsContent value="curriculum">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Kurikulum
                            </h1>
                            <ol className="list-decimal pl-4">
                                {course.curriculums?.map((curriculum) => (
                                    <li key={curriculum.id}>
                                        {curriculum.title}
                                        <p className="font-light">{curriculum.description}</p>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Review */}
                    <TabsContent value="reviews">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <section className="flex flex-col gap-2">
                                <h1 className="text-xl md:text-2xl font-semibold w-full">
                                    Buatkan Ulasan
                                </h1>
                                {/* TO-DO: Bentuk pilih rating sebagai icon slider */}
                                <div className="inline-flex gap-2 items-center">
                                    <p>Silahkan pilih bintang: </p>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih bintang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Textarea placeholder="Tulis detail ulasan kamu (saran, kritik, dan lainnya) di sini." />
                                <p className="text-muted-foreground text-sm">
                                    Pastikan ulasan tidak melanggar kebijakan dan ketentuan kami.
                                </p>
                                <Button>Kirim ulasan</Button>
                            </section>
                            <section>
                                <h1 className="text-xl md:text-2xl font-semibold w-full">
                                    Ulasan
                                </h1>
                                <div>
                                    {course.reviews?.map((review) => (
                                        <CourseReview
                                            key={review.id}
                                            comment={review.comment}
                                            rating={review.rating}
                                        />
                                    ))}
                                </div>
                            </section>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Side Page */}
            <Card className={"basis-lg h-fit"}>
                <CardContent>

                    {/* Payment Section */}
                    <section className="mb-4 pb-4 border-b">
                        <div>
                            <p className="text-muted-foreground font-light">Harga:</p>
                            <p className="text-2xl" id="price">
                                Rp {course.price}
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-2 pt-2 pb-2">
                            <Button>Beli Sekarang</Button>
                            <Button>Tambahkan ke Keranjang</Button>
                        </div>
                    </section>

                    {/* Share Section */}
                    <section>
                        <p className="text-muted-foreground font-light">
                            Bagikan kursus ini
                        </p>
                        <div className="w-full flex flex-row gap-2 pt-2 pb-2">
                            <Button className={"bg-secondary grow"}>
                                Bagikan
                                <Share />
                            </Button>
                            <Button className={"bg-secondary"}>
                                <Link />
                            </Button>
                        </div>
                    </section>

                </CardContent>
            </Card>

        </div>
    );
}
