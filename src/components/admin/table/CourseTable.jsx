import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ImageOff, List, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CourseTable = ({ courses, onView, onEdit, onDelete }) => {
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
    <div className="rounded-md border bg-white">
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {courses.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <p className='text-muted-foreground font-light'>No results...</p>
              </TableCell>
            </TableRow>
          )}

          {courses?.map((course) => (
            <Fragment key={course.id}>
              <TableRow>
                <TableCell>{course.id}</TableCell>
                <TableCell>
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 md:w-24 aspect-video object-cover rounded shadow-sm"
                    />
                  ) : (
                    <div className="w-16 md:w-24 aspect-video flex items-center justify-center gap-2 bg-neutral-100 text-muted-foreground border rounded shadow-sm">
                      <ImageOff />
                    </div>
                  )}
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  {Number(course.price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-medium border-0 ${getAccessBadgeColor(
                      course.access_type
                    )}`}
                  >
                    {course.access_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(course)}>
                        <Eye />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/courses/${course.id}`}>
                          <List />
                          Edit Curriculums
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(course)}>
                        <Pencil />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(course.id)}>
                        <Trash />
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
