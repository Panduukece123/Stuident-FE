import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronLeft, Link, Share, Smile, Star, User } from "lucide-react";
import * as React from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";

export default function CourseShowPage() {
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
                                <BreadcrumbLink href="#">Catogery Course</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem aria-current="page">
                                <BreadcrumbPage>This Course</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                </div>

                {/* Summary Page */}
                <div className="my-4">
                    <h1 className="text-2xl md:text-3xl font-semibold w-full">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit
                    </h1>
                    <p className="text-base md:text-lg font-light text-muted-foreground w-full">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt enim vitae repellat hic quis quibusdam possimus neque totam laborum dicta cupiditate laudantium mollitia minus dignissimos commodi error ratione.
                    </p>
                    <div className="grid grid-cols-2 mt-4 gap-2">

                        <div className="inline-flex gap-1" id="course_summary_badge">
                            <Badge variant="default">
                                Intermediate
                                <Smile/>
                            </Badge>
                            <Badge variant="default">Lorem Ipsum</Badge>
                            <Badge variant="default">Dolor Sit Amet</Badge>
                        </div>

                        <div className="inline-flex gap-1 justify-end" id="course_summary_participant">
                            <User />
                            <p id="course_summary_participant-num">1024</p>
                            <p className="text-muted-foreground font-light">pengikut</p>
                        </div>

                        <div className="inline-flex gap-1" id="course_summary_author">
                            <p className="text-muted-foreground font-light">Dibuat oleh:</p>
                            <p id="course_summary_author-name">Lorem ipsum</p>
                        </div>

                        <div className="inline-flex gap-1 justify-end" id="course_summary_review">
                            <Star />
                            <p id="course_summary_review-num">4.5</p>
                            <p className="text-muted-foreground font-light">dari 100 ulasan</p>
                        </div>

                    </div>
                </div>

                {/* Detail Page */}
                <Tabs defaultValue="overview">

                    <TabsList className={"w-full rounded-b-none border"}>
                        <TabsTrigger value="overview">Kilasan</TabsTrigger>
                        <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
                        <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Deskripsi
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur tempore sapiente veritatis illum vel, error ut quas repudiandae illo distinctio incidunt laboriosam repellat, voluptas excepturi accusantium dignissimos quae omnis!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur tempore sapiente veritatis illum vel, error ut quas repudiandae illo distinctio incidunt laboriosam repellat, voluptas excepturi accusantium dignissimos quae omnis!
                            </p>
                        </Card>
                    </TabsContent>

                    <TabsContent value="curriculum">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Kurikulum
                            </h1>
                            <ol className="list-decimal">
                                <li>
                                    Lorem Ipsum Dolor Sit Amet
                                    <ul className="list-disc">
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                    </ul>
                                </li>
                                <li>
                                    Lorem Ipsum Dolor Sit Amet
                                    <ul className="list-disc">
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                    </ul>
                                </li>
                                <li>
                                    Lorem Ipsum Dolor Sit Amet
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                    </ul>
                                </li>
                            </ol>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <Card className={"p-4 md:p-8 rounded-t-none border-t-0 shadow-none"}>
                            <h1 className="text-xl md:text-2xl font-semibold w-full">
                                Ulasan
                            </h1>
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
                            <div className="grid w-full gap-2">
                                <p>Tulis detail ulasan kamu (saran, kritik, dan lainnya) di sini:</p>
                                <Textarea placeholder="Type your message here." />
                                <p className="text-muted-foreground text-sm">
                                    Pastikan ulasan tidak melanggar kebijakan dan ketentuan kami.
                                </p>
                            </div>
                            <Button>Kirim ulasan</Button>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <Card className={"basis-lg h-fit"}>
                <CardContent>

                    {/* Payment Section */}
                    <section className="mb-4 pb-4 border-b">
                        <div>
                            <p className="text-muted-foreground font-light">Harga:</p>
                            <p className="text-2xl" id="price">
                                Rp 9.000.000,00
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
