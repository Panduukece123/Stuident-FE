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
      color: "text-blue-600", 
      bgColor: "bg-blue-50" 
    },
    { 
      title: "Active", 
      value: data.active, 
      icon: UserCheck, 
      color: "text-green-600", 
      bgColor: "bg-green-50" 
    },
    { 
      title: "Inactive", 
      value: data.inactive, 
      icon: UserMinus, 
      color: "text-slate-500", 
      bgColor: "bg-slate-50" 
    },
    { 
      title: "Suspended", 
      value: data.suspended, 
      icon: UserX, 
      color: "text-red-600", 
      bgColor: "bg-red-50" 
    },
    { 
      title: "Admins", 
      value: data.admins, 
      icon: Shield, 
      color: "text-indigo-600", 
      bgColor: "bg-indigo-50" 
    },
    { 
      title: "Mentors", 
      value: data.mentors, 
      icon: GraduationCap, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50" 
    },
    { 
      title: "Students", 
      value: data.students, 
      icon: BookUser, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50" 
    },
    { 
      title: "Corporate", 
      value: data.corporate, 
      icon: Building2, 
      color: "text-cyan-600", 
      bgColor: "bg-cyan-50" 
    },
  ];

  // Skeleton Loading (Menyesuaikan 8 kartu)
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-neutral-100 animate-pulse border border-neutral-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="shadow-sm border-neutral-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-neutral-800">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};