import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, FileText, Calendar, Building, ChevronLeft, ChevronRight } from "lucide-react";

// Components
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Service
import ProfileService from "@/services/ProfileService";

export const MyProfileScholarshipApplication = () => {
  // State Pagination
  const [page, setPage] = useState(1);

  // --- QUERY ---
  const { data: result, isLoading, isFetching } = useQuery({
    queryKey: ["my-applications", page],
    queryFn: () => ProfileService.getMyApplications({ page: page }),
    placeholderData: (prev) => prev, 
  });

  const applications = result?.data || [];
  const meta = result?.meta || {};

  // Helper untuk warna status
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Diterima</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Ditolak</Badge>;
      case "interview":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Wawancara</Badge>;
      default: 
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Menunggu</Badge>;
    }
  };

  // Helper Format Tanggal Native JS (id-ID)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Scholarship Application</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Lamaran</CardTitle>
          <CardDescription>
             Total lamaran: {meta.total || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : applications.length === 0 ? (
            // --- EMPTY STATE ---
            <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-500">
              <div className="bg-neutral-100 p-3 rounded-full mb-3">
                <FileText className="h-6 w-6 text-neutral-400" />
              </div>
              <p className="font-medium">Belum ada lamaran</p>
              <p className="text-sm">Kamu belum melamar beasiswa apapun saat ini.</p>
            </div>
          ) : (
            // --- TABLE DATA ---
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Beasiswa</TableHead>
                      <TableHead>Tanggal Melamar</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.scholarship?.name || "Nama Program Tidak Tersedia"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Calendar className="h-3 w-3" />
                            {/* Pakai Helper Native JS */}
                            {formatDate(item.created_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* --- PAGINATION CONTROLS --- */}
              {meta.last_page > 1 && (
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-sm text-muted-foreground mr-2">
                    Halaman {meta.current_page} dari {meta.last_page}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={meta.current_page === 1 || isFetching}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((old) => (old < meta.last_page ? old + 1 : old))}
                    disabled={meta.current_page === meta.last_page || isFetching}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};