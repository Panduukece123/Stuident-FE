import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export const CreateArticleDialog = ({ open, onOpenChange, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
    image: null, // File object
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Article</DialogTitle>
          <DialogDescription>Fill in the details to publish a new article.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={handleChange} required placeholder="Article title..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={formData.category} onChange={handleChange} required placeholder="News, Tips, etc." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" value={formData.author} onChange={handleChange} required placeholder="Writer name" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="image">Cover Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={formData.content} onChange={handleChange} required placeholder="Write your content here..." className="h-32" />
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Article
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};