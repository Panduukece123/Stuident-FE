import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText,
  CheckCircle
} from "lucide-react";
import UserService from "@/services/admin/UserService";

export const UserDetailDialog = ({ userId, open, onOpenChange }) => {
  
  // 1. Fetch Data Detail User
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["admin-user-detail", userId],
    queryFn: () => UserService.getUserDetail(userId),
    enabled: open && !!userId, // Fetch cuma kalau dialog buka
    staleTime: 0, // Selalu ambil data terbaru
  });

  // 2. Helper Formatter Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
    });
  };

  // 3. Helper URL CV (Sesuaikan base URL storage kamu)
  const getCvUrl = (path) => {
    if (!path) return "#";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000/storage/${path}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Detailed information for User ID: {userId}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading user details...</p>
          </div>
        ) : isError || !user ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2 text-red-500">
            <p>Failed to load user details.</p>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* --- SECTION 1: HEADER & AVATAR --- */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b pb-6">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg ring-1 ring-gray-100">
                    <AvatarImage src={user.avatar || user.profile_photo} className="object-cover" />
                    <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                        {user.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {/* Role Badge */}
                        <Badge variant="secondary" className="capitalize px-3 py-1 bg-blue-50 text-blue-700 border-blue-100">
                            {user.role}
                        </Badge>
                        
                        {/* Status Badge */}
                        <Badge variant="outline" className={`capitalize px-3 py-1 ${
                            user.status === 'active' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                            {user.status}
                        </Badge>

                        {/* Google Linked Badge */}
                        {user.google_id && (
                            <Badge variant="outline" className="gap-1 bg-white text-gray-600 border-gray-200">
                                <span className="text-[10px]">Google Linked</span> 
                                <CheckCircle size={12} className="text-blue-500" />
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: PERSONAL INFO GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Phone} label="Phone" value={user.phone} />
                <InfoItem icon={User} label="Gender" value={user.gender} capitalize />
                <InfoItem icon={Calendar} label="Birth Date" value={formatDate(user.birth_date)} />
                <InfoItem icon={MapPin} label="Address" value={user.address} className="md:col-span-2" />
            </div>

            {/* --- SECTION 3: ACADEMIC / PROFESSIONAL --- */}
            <div className="bg-neutral-50rounded-xl border border-neutral-100 space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Academic & Professional</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={Building} label="Institution" value={user.institution} />
                    <InfoItem icon={GraduationCap} label="Degree" value={user.education_level} />
                    <InfoItem icon={Briefcase} label="Major" value={user.major} />
                    <InfoItem 
                        icon={Briefcase} 
                        label="Specialization" 
                        value={Array.isArray(user.specialization) ? user.specialization.join(", ") : user.specialization} 
                    />
                </div>
            </div>

            {/* --- SECTION 4: BIO & CV --- */}
            <div className="grid grid-cols-1 gap-4">
                {/* Biography */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase">Biography</h4>
                    <div className="p-3 bg-white border rounded-lg text-sm text-gray-600 italic leading-relaxed">
                        "{user.bio || "No biography provided yet."}"
                    </div>
                </div>

                {/* CV Download Button */}
                {user.cv_path ? (
                    <Button 
                        className="w-full sm:w-auto gap-2 mt-2" 
                        variant="outline"
                        onClick={() => window.open(getCvUrl(user.cv_path), '_blank')}
                    >
                        <FileText size={16} className="text-red-500" /> 
                        View Attached CV / Resume
                    </Button>
                ) : (
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                        <FileText size={16} /> No CV uploaded.
                    </div>
                )}
            </div>

            {/* --- FOOTER: JOINED DATE --- */}
            <div className="text-xs text-center text-muted-foreground pt-4 border-t">
                User joined on {formatDate(user.created_at)}
            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// --- Helper Component untuk Item Grid ---
const InfoItem = ({ icon: Icon, label, value, className, capitalize }) => (
    <div className={`flex items-start gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors ${className}`}>
        <div className="mt-0.5 p-1.5 bg-white border rounded-md shadow-sm text-muted-foreground">
            <Icon size={14}/>
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <span className={`text-sm font-medium text-gray-800 ${capitalize ? 'capitalize' : ''}`}>
                {value || "-"}
            </span>
        </div>
    </div>
);