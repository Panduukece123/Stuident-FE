import React from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserMinus, 
  Shield, 
  GraduationCap, 
  Building2, 
  BookUser 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserStats = ({ stats, isLoading }) => {
  const data = stats || {
    total: 0,
    admins: 0,
    students: 0,
    mentors: 0,
    corporate: 0,
    active: 0,
    inactive: 0,
    suspended: 0
  };

  const statItems = [
    { 
      title: "Total Users", 
      value: data.total, 
      icon: Users, 
      iconClass: "text-muted-foreground", // Icon abu-abu standard
      valueClass: "text-neutral-900",
      desc: "Semua pengguna terdaftar"
    },
    { 
      title: "Active", 
      value: data.active, 
      icon: UserCheck, 
      iconClass: "text-green-600",
      valueClass: "text-green-700", // Angka hijau
      desc: "Pengguna aktif saat ini"
    },
    { 
      title: "Inactive", 
      value: data.inactive, 
      icon: UserMinus, 
      iconClass: "text-slate-500",
      valueClass: "text-slate-700",
      desc: "Jarang beraktivitas"
    },
    { 
      title: "Suspended", 
      value: data.suspended, 
      icon: UserX, 
      iconClass: "text-red-600",
      valueClass: "text-red-700", // Angka merah
      desc: "Akun dibekukan"
    },
    // --- ROLES ---
    { 
      title: "Admins", 
      value: data.admins, 
      icon: Shield, 
      iconClass: "text-indigo-600",
      valueClass: "text-neutral-900",
      desc: "Administrator sistem"
    },
    { 
      title: "Mentors", 
      value: data.mentors, 
      icon: GraduationCap, 
      iconClass: "text-purple-600",
      valueClass: "text-neutral-900",
      desc: "Tenaga pengajar"
    },
    { 
      title: "Students", 
      value: data.students, 
      icon: BookUser, 
      iconClass: "text-orange-600",
      valueClass: "text-neutral-900",
      desc: "Mahasiswa/Pelajar"
    },
    { 
      title: "Corporate", 
      value: data.corporate, 
      icon: Building2, 
      iconClass: "text-cyan-600",
      valueClass: "text-neutral-900",
      desc: "Partner perusahaan"
    },
  ];

  // Skeleton Loading
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
             </CardHeader>
             <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-32" />
             </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            {/* Icon langsung tanpa background box */}
            <item.icon className={`h-4 w-4 ${item.iconClass}`} />
          </CardHeader>
          <CardContent>
            {/* Value Bold & Berwarna sesuai status */}
            <div className={`text-2xl font-bold ${item.valueClass}`}>
                {item.value}
            </div>
            {/* Deskripsi kecil di bawah */}
            <p className="text-xs text-muted-foreground">
                {item.desc}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};