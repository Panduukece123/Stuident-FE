import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  ImageOff,
  List,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CourseTable = ({ courses, onView, onEdit, onDelete }) => {
  // Fungsi helper untuk warna badge akses
  const getAccessBadgeColor = (type) => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-700 border-green-200";
      case "regular":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "premium":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-neutral-50">
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead className="min-w-[200px]">Title</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Access</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* State jika data kosong */}
          {courses.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center">
                <p className="text-muted-foreground font-light italic">
                  No courses found...
                </p>
              </TableCell>
            </TableRow>
          )}

          {courses?.map((course) => (
            <TableRow
              key={course.id}
              className="group transition-colors hover:bg-neutral-50/50"
            >
              <TableCell className="font-mono text-xs text-neutral-500">
                #{course.id}
              </TableCell>

              <TableCell>
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 md:w-20 aspect-video object-cover rounded-md shadow-sm border border-neutral-200"
                    // Handle error jika URL gambar rusak
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400?text=Error";
                    }}
                  />
                ) : (
                  <div className="w-16 md:w-20 aspect-video flex items-center justify-center gap-2 bg-neutral-100 text-neutral-400 border rounded-md">
                    <ImageOff size={16} />
                  </div>
                )}
              </TableCell>

              <TableCell className="font-medium text-neutral-900">
                {course.title}
                <div className="flex gap-2 items-center mt-1">
                  <div className="text-xs text-neutral-500 font-normal md:hidden">
                    {course.instructor}
                  </div>
                  {course.certificate_url && (
                    <a
                      href={course.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-4 px-1 bg-blue-50 text-blue-600 border-blue-100 cursor-pointer"
                      >
                        Link Cert
                      </Badge>
                    </a>
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-neutral-600">
                {course.instructor}
              </TableCell>

              <TableCell>
                {Number(course?.price || 0) <= 0 ? (
                  <span className="text-green-600 font-semibold">Free</span>
                ) : (
                  <span className="text-neutral-700">
                    {Number(course?.price || 0).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                )}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={`capitalize font-medium border ${getAccessBadgeColor(
                    course.access_type
                  )}`}
                >
                  {course.access_type}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => onView(course)}
                      className="cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4 text-blue-500" />
                      View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to={`/admin/courses/${course.id}`}>
                        <List className="mr-2 h-4 w-4 text-purple-500" />
                        Edit Curriculums
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onEdit(course)}
                      className="cursor-pointer"
                    >
                      <Pencil className="mr-2 h-4 w-4 text-orange-500" />
                      Edit Basic Info
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onDelete(course.id)}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
