import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ScholarshipTable = ({ data, onView, onEdit, onDelete }) => {
  if (data.length === 0) {
    return (
        <Card><CardContent className="flex flex-col items-center justify-center py-10 text-neutral-500">
            <p>Tidak ada data beasiswa ditemukan.</p>
        </CardContent></Card>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Program</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                 <div>
                    <div className="font-semibold text-neutral-800">{item.name}</div>
                    <div className="text-xs text-neutral-500 truncate w-64">{item.description}</div>
                 </div>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-1 text-neutral-600 text-sm">
                    <MapPin className="h-3 w-3" /> {item.location}
                 </div>
              </TableCell>
              <TableCell>
                <Badge 
                    variant={item.status === 'open' ? 'default' : 'secondary'} 
                    className={item.status === 'open' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-neutral-100 text-neutral-600'}
                >
                  {item.status === 'open' ? 'Open' : 'Closed'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {new Date(item.deadline).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onView(item.id)}>
                      <Eye className="mr-2 h-4 w-4" /> Lihat Detail / Pelamar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit Program
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-red-600 focus:text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Hapus
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