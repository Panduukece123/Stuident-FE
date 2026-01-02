import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ArticleTable = ({ articles, onView, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
             <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No articles found.
                </TableCell>
             </TableRow>
          ) : (
            articles.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {/* Thumbnail Image */}
                  <div className="h-10 w-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
                    {/* PERBAIKAN DI SINI: Gunakan image_url, bukan image */}
                    {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt="thumb" 
                          className="h-full w-full object-cover" 
                        />
                    ) : (
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                    <div className="truncate w-64" title={item.title}>
                        {item.title}
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                {/* Handle jika author null atau ada di object relasi */}
                <TableCell>{item.author}</TableCell> 
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(item.id)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit Article
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};