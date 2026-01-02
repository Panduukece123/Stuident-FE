import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OrganizationTable = ({ organizations, onView, onEdit, onDelete }) => {
  
  // Helper URL Gambar (Sama kayak Article tadi)
  const getLogoUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl = "http://localhost:8000/storage/"; // Sesuaikan port
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.length === 0 ? (
             <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No organizations found.
                </TableCell>
             </TableRow>
          ) : (
            organizations.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar className="h-10 w-10 rounded-lg border bg-gray-50">
                    <AvatarImage 
                        src={getLogoUrl(item.logo_url)} 
                        alt={item.name} 
                        className="object-contain" // Biar logo gak kepotong aneh
                    />
                    <AvatarFallback className="rounded-lg">
                        <Building2 className="h-5 w-5 text-gray-400"/>
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                    {item.name}
                </TableCell>
                <TableCell>
                    {/* Logic warna badge berdasarkan tipe */}
                    <Badge variant="outline" className={
                        item.type === 'company' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        item.type === 'university' ? "bg-purple-50 text-purple-700 border-purple-200" :
                        item.type === 'community' ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-gray-50 text-gray-700"
                    }>
                        {item.type}
                    </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">
                    {item.description || "-"}
                </TableCell> 
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
                        <Pencil className="mr-2 h-4 w-4" /> Edit Data
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