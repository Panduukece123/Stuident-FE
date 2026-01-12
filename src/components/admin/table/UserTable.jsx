import React from "react"; // Hapus useState karena tidak dipakai lagi
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Pencil,
  Trash,
  Ban,
  CheckCircle,
  Eye,
} from "lucide-react";

export const UserTable = ({
  users,        // Isinya 15 user dari halaman saat ini
  page = 1,     // Halaman aktif (dari Parent)
  totalPages = 1, // Total halaman (dari Parent)
  onPageChange, // Fungsi untuk ganti halaman (dari Parent)
  onView,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
}) => {
  
  // LOGIC WARNA BADGE (Tetap sama)
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200";
      case "mentor": return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200";
      case "corporate": return "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200";
      default: return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200";
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
      : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              // Kita langsung map 'users' karena array ini isinya sudah sesuai halaman
              users.map((user) => (
                <TableRow key={user.id}>
                  {/* KOLOM 1: NAMA */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-neutral-800">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground md:hidden">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* KOLOM 2: EMAIL */}
                  <TableCell className="text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>

                  {/* KOLOM 3: ROLE */}
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`capitalize font-medium border-0 ${getRoleBadgeColor(user.role)}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  {/* KOLOM 4: STATUS */}
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`capitalize font-medium border-0 ${getStatusBadgeColor(user.status)}`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* KOLOM 5: ACTIONS */}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-neutral-100">
                          <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem onClick={() => onView(user.id)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4 text-blue-500" /> View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onEdit(user)} className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4 text-neutral-500" /> Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => onSuspend(user.id)} className="cursor-pointer text-orange-600 focus:text-orange-600 focus:bg-orange-50">
                            <Ban className="mr-2 h-4 w-4" /> Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => onActivate(user.id)} className="cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50">
                            <CheckCircle className="mr-2 h-4 w-4" /> Activate
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem onClick={() => onDelete(user.id)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};