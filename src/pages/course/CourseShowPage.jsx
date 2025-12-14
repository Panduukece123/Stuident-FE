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
import { Item, ItemContent } from "@/components/ui/item";
import LevelBadge from "@/components/LevelBadge";
import ReviewItem from "@/components/ReviewItem";
import { formatPrice, formatTimestamp } from "@/services/Format";

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

    const calculateRating = () => {
        if (!course.reviews || course.reviews.length === 0)
            return { ratingAverage: 0, ratingTotal: 0 };
        
        const sum = course.reviews.reduce((total, review) => total + review.rating, 0); // Each review is always integers (1-5)
        const average = sum / course.reviews.length;

        return { 
            ratingAverage: average.toFixed(1), // One decimal place
            ratingTotal: course.reviews.length 
        };
    };
    const { ratingAverage, ratingTotal } = calculateRating();

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
                    { course.image && (
                        <img
                            src={course.image}
                            alt="Course Thumbnail"
                            className="w-full h-48 md:h-64 object-cover rounded-lg my-4"
                        />
                    )}
                    <p className="text-base md:text-lg font-light text-muted-foreground w-full">
                        {course.description}
                    </p>
                    <div className="grid grid-cols-2 mt-4 gap-2">

                        <div className="inline-flex flex-wrap gap-1" id="course_summary_badge">
                            <LevelBadge level={course.level}/>
                            <Badge variant="default">{course.category}</Badge>
                            <Badge variant="default">{course.type}</Badge>
                        </div>

                        <div className="inline-flex gap-1 justify-end" id="course_summary_participant">
                            <User />
                            <p id="course_summary_participant-num">{course.enrollments?.length || 0}</p>
                            <p className="text-muted-foreground font-light">pendaftar</p>
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

                            {course.summary?.video_url ? (
                                <section>
                                    <h1 className="text-xl md:text-2xl font-semibold w-full pb-4">
                                        Video Kilasan
                                    </h1>
                                    <iframe
                                        src={course.summary.video_url}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ width: "100%", aspectRatio: "16/9" }}
                                    ></iframe>
                                    <p className="text-sm text-muted-foreground">
                                        Durasi tonton: {course.summary.video_duration}
                                    </p>
                                </section>
                            ) : null}

                            <section>
                                <h1 className="text-xl md:text-2xl font-semibold w-full pb-4">
                                    Deskripsi
                                </h1>
                                <p>{course.summary?.description}</p>
                            </section>

                            <section>
                                <p className="font-light text-muted-foreground">
                                    Dibuat pada: {formatTimestamp(course.created_at)}
                                </p>
                                <p className="font-light text-muted-foreground">
                                    Diupdate pada: {formatTimestamp(course.updated_at)}
                                </p>
                            </section>
                            
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Curriculum */}
                    <TabsContent value="curriculum">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Kurikulum
                            </h1>
                            
                            <div className="space-y-4">

                                {(() => {
                                    const sections = [...new Set(course.curriculums?.map(c => c.section) || [])]; {/* Get all unique sections */}

                                    return sections.map((section, index) => (
                                        <div key={index}>
                                            {/* Section title */}
                                            <h2 className="text-lg font-semibold mb-2">
                                                {section}
                                            </h2>

                                            {/* Curriculums for one section */}
                                            <div className="space-y-2 md:ml-4">
                                                {course.curriculums
                                                    ?.filter(curriculum => curriculum.section === section)
                                                    ?.map(curriculum => (

                                                        <Item key={curriculum.id} variant="outline" size="sm" asChild>
                                                            <a> <ItemContent>
                                                                <h3 className="font-medium">
                                                                    {curriculum.title}
                                                                </h3>
                                                                <p className="text-sm font-light mt-1">
                                                                    {curriculum.description}
                                                                </p>
                                                            </ItemContent> </a>
                                                        </Item>

                                                    ))}
                                            </div>

                                        </div>
                                    ));
                                })()}
                                
                            </div>

                        </Card>
                    </TabsContent>

                    {/* Tab Content: Review */}
                    <TabsContent value="reviews">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <section className="flex flex-col gap-2 border-b pb-6">
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
                                            <SelectItem value="1">
                                                <Star size={24} fill="currentColor"/>
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                            </SelectItem>
                                            <SelectItem value="4">
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                            </SelectItem>
                                            <SelectItem value="5">
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                                <Star size={24} fill="currentColor"/>
                                            </SelectItem>
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
                                <div className="space-y-4 py-4">
                                    {course.reviews?.length > 0 ? course.reviews.map((review) => (
                                        <ReviewItem
                                            userName={review.user.name}
                                            userProfilePic={review.user.profile_photo}
                                            key={review.id}
                                            comment={review.comment}
                                            rating={review.rating}
                                        />
                                    )) : (
                                        <p className="w-full text-muted-foreground">
                                            Tidak ada ulasan
                                        </p>
                                    )
                                    }
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
                                {formatPrice(course.price)}
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-2 pt-2 pb-2">
                            <Button>Beli Sekarang</Button>
                            <Button>Tambahkan ke Favorit</Button>
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
