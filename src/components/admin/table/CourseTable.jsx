import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";

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
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border shadow-sm">

        {/* Head row */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left font-medium text-sm">ID</th>
            <th className="border p-2 text-left font-medium text-sm">Gambar</th>
            <th className="border p-2 text-left font-medium text-sm">Title</th>
            <th className="border p-2 text-left font-medium text-sm">Instructor</th>
            <th className="border p-2 text-right font-medium text-sm">Price</th>
            <th className="border p-2 text-center font-medium text-sm">Access</th>
            <th className="border p-2 text-center font-medium text-sm">Actions</th>
          </tr>
        </thead>
        
        {/* Course row */}
        <tbody>
          {courses.map((course) => (
            <React.Fragment key={course.id}>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border p-2 text-sm">{course.id}</td>
                <td className="border p-2">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="border p-2 font-medium text-sm">{course.title}</td>
                <td className="border p-2 text-sm">{course.instructor}</td>
                <td className="border p-2 text-right text-sm">
                  {Number(course.price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="border p-2 text-center">
                  <Badge
                    variant="outline"
                    className={`capitalize font-medium border-0 ${getAccessBadgeColor(
                      course.access_type
                    )}`}
                  >
                    {course.access_type}
                  </Badge>
                </td>
                <td className="border p-2">
                  <div className="flex gap-1 justify-center">
                    <Button
                      size="sm"
                      onClick={() => onEdit(course)}
                      title="Edit course"
                    >
                      <Edit />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(course.id)}
                      title="Delete course"
                    >
                      <Trash />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleExpand(course.id)}
                      title={expandedId === course.id ? "Hide details" : "Show details"}
                    >
                      Details
                      {expandedId === course.id ? (<ChevronUp />) : (<ChevronDown />)}
                    </Button>
                  </div>
                </td>
              </tr>

              {expandedId === course.id && (
                <tr>
                  <td colSpan={7} className="border p-4 bg-gray-50">
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
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
