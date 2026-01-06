import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, XCircle, Users, Clock } from "lucide-react"; // Tambah icon Clock

export const ScholarshipStats = ({ stats }) => {
  return (
    // Ubah lg:grid-cols-4 menjadi lg:grid-cols-5 agar muat 5 kartu
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      
      {/* 1. TOTAL */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Program</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Semua beasiswa dibuat</p>
        </CardContent>
      </Card>
      
      {/* 2. ACTIVE (OPEN) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktif (Open)</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{stats.active}</div>
          <p className="text-xs text-muted-foreground">Sedang menerima pendaftar</p>
        </CardContent>
      </Card>

      {/* 3. COMING SOON (BARU) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Segera Hadir</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats.coming_soon}</div>
          <p className="text-xs text-muted-foreground">Akan segera dibuka</p>
        </CardContent>
      </Card>

      {/* 4. CLOSED */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ditutup (Closed)</CardTitle>
          <XCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">{stats.closed}</div>
          <p className="text-xs text-muted-foreground">Masa pendaftaran habis</p>
        </CardContent>
      </Card>

      {/* 5. APPLICANTS */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pelamar</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          {/* Aku ubah jadi ungu biar beda sama status beasiswa */}
          <div className="text-2xl font-bold text-purple-700">{stats.applicants}</div>
          <p className="text-xs text-muted-foreground">Mahasiswa mendaftar</p>
        </CardContent>
      </Card>
    </div>
  );
};