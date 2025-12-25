import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateEditCourseDialog = ({
  open,
  onOpenChange,
  onSave,
  course,
  saving,
}) => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    type: "course",
    instructor: "",
    level: "beginner",
    duration: "",
    price: 0,
    access_type: "free",
    certificate_url: "",
    video_url: "",
    video_duration: "",
  });

  useEffect(() => {
    if (course) {
      setForm({ ...course, price: Number(course.price) });
    } else {
      setForm({
        title: "",
        image: "",
        category: "",
        description: "",
        type: "course",
        instructor: "",
        level: "beginner",
        duration: "",
        price: 0,
        access_type: "free",
        certificate_url: "",
        video_url: "",
        video_duration: "",
      });
    }
  }, [course]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    // cek field yang kosong
    const requiredFields = [
      "title",
      "image",
      "category",
      "description",
      "type",
      "instructor",
      "level",
      "duration",
      "price",
      "access_type",
      "certificate_url",
      "video_url",
      "video_duration",
    ];

    const emptyField = requiredFields.find((field) => {
      const value = form[field];
      return value === "" || value === null || value === undefined;
    });

    if (emptyField) {
      alert(`Field "${emptyField}" wajib diisi!`);
      return;
    }

    // validasi video_url
    const urlPattern = /^(https?:\/\/[^\s]+)$/;
    if (form.video_url && !urlPattern.test(form.video_url)) {
      alert(
        "Video URL tidak valid! Pastikan formatnya: https://example.com/video"
      );
      return;
    }

    // panggil onSave
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{course ? "Edit Course" : "Create Course"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <Input
            placeholder="Instructor"
            value={form.instructor}
            onChange={(e) => handleChange("instructor", e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <Input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          <Input
            placeholder="Certificate URL"
            value={form.certificate_url}
            onChange={(e) => handleChange("certificate_url", e.target.value)}
          />
          <Input
            placeholder="Video URL"
            value={form.video_url}
            onChange={(e) => handleChange("video_url", e.target.value)}
          />
          <Input
            placeholder="Video Duration"
            value={form.video_duration}
            onChange={(e) => handleChange("video_duration", e.target.value)}
          />

          <Select
            value={form.type}
            onValueChange={(v) => handleChange("type", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="bootcamp">Bootcamp</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={form.level}
            onValueChange={(v) => handleChange("level", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={form.access_type}
            onValueChange={(v) => handleChange("access_type", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Access Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : course ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCourseDialog;
