import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Edit, Eye, List, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CourseTable = ({ courses, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-md shadow-sm"
                  />
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
                      <DropdownMenuItem onClick={() => toggleExpand(course.id)}>
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

              {expandedId === course.id && (
                <TableRow>
                  <TableCell colSpan={8} className="p-0">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-1 text-sm">
                        <p>
                          <strong>Category:</strong> {course.category}
                        </p>
                        <p>
                          <strong>Type:</strong> {course.type}
                        </p>
                        <p>
                          <strong>Level:</strong> {course.level}
                        </p>
                        <p>
                          <strong>Duration:</strong> {course.duration}
                        </p>
                        <p>
                          <strong>Total Curriculum Duration:</strong>{" "}
                          {course.total_curriculum_duration}
                        </p>
                        <p>
                          <strong>Total Videos:</strong> {course.total_videos}
                        </p>
                        <p>
                          <strong>Video Duration:</strong> {course.video_duration}
                        </p>
                        <p>
                          <strong>Certificate:</strong>{" "}
                          {course.certificate_url ? (
                            <a
                              href={course.certificate_url}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              Download
                            </a>
                          ) : (
                            "-"
                          )}
                        </p>
                        <p>
                          <strong>Enrollments:</strong> {course.enrollments_count}
                        </p>
                        <p>
                          <strong>Average Rating:</strong>{" "}
                          {course.reviews_avg_rating}
                        </p>
                        <p>
                          <strong>Description:</strong> {course.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
