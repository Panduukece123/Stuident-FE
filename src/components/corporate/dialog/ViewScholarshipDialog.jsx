import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Loader2, Check, X, Calendar, MapPin, FileText, User, 
  Globe, Mail, BookOpen, Star, CheckCircle2, XCircle, Clock, 
  Eye
} from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import ScholarshipService from "@/services/corporate/ScholarshipService";

// IMPORT DIALOG DETAIL YANG SUDAH DIPISAH
import { ApplicationDetailDialog } from "./ApplicationDetailDialog";

export const ViewScholarshipDialog = ({ open, onOpenChange, scholarshipId }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // STATE UNTUK DETAIL DIALOG
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);

  // 1. FETCH DETAIL (Scholarship Info)
  const { data: rawDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ["scholarship-detail", scholarshipId],
    queryFn: () => ScholarshipService.getScholarshipDetail(scholarshipId),
    enabled: !!scholarshipId && open,
    staleTime: 0, 
  });

  const scholarship = rawDetail?.data || {};

  // 2. FETCH APPLICANTS LIST
  const { data: rawApplicants, isLoading: loadingApplicants } = useQuery({
    queryKey: ["scholarship-applicants", scholarshipId],
    queryFn: async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/scholarship-applications?scholarship_id=${scholarshipId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!scholarshipId && open,
    staleTime: 0,
  });

  const applicants = rawApplicants?.data || [];

  // 3. MUTATION STATUS
  const statusMutation = useMutation({
    mutationFn: async ({ applicationId, status }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/scholarship-applications/${applicationId}/status`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || "Gagal mengupdate status");
        }
        return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["scholarship-applicants", scholarshipId]);
        alert("Status pelamar berhasil diperbarui!");
    },
    onError: (err) => {
        console.error(err);
        alert("Gagal update: " + err.message);
    }
  });

  const handleStatusChange = (appId, newStatus) => {
    if (confirm(`Ubah status pelamar menjadi ${newStatus}?`)) {
        statusMutation.mutate({ applicationId: appId, status: newStatus });
    }
  };

  const handleViewDetail = (appId) => {
      setSelectedAppId(appId);
      setDetailOpen(true);
  };

  // --- HELPERS ---
  const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", { 
          day: 'numeric', month: 'long', year: 'numeric' 
      });
  };

  const renderStatus = (status) => {
    switch (status) {
        case 'accepted': 
            return <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100"><CheckCircle2 className="w-3.5 h-3.5" /> Diterima</div>;
        case 'rejected': 
            return <div className="flex items-center gap-1 text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100"><XCircle className="w-3.5 h-3.5" /> Ditolak</div>;
        default: 
            return <div className="flex items-center gap-1 text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100"><Clock className="w-3.5 h-3.5" /> Pending</div>;
    }
  };

  if (!open) return null;

  return (
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[850px] h-[90vh] flex flex-col p-0 overflow-hidden">
            
            {/* HEADER */}
            <DialogHeader className="px-6 py-4 border-b shrink-0">
                <DialogTitle className="flex items-center gap-4">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="truncate text-xl font-bold text-neutral-800">
                            {loadingDetail ? "Memuat..." : (scholarship?.name || "Detail Beasiswa")}
                        </span>
                        {scholarship?.is_recommended === 1 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200 gap-1">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> Recommended
                            </Badge>
                        )}
                    </div>
                    
                    {!loadingDetail && scholarship?.status && (
                        <Badge variant={scholarship.status === 'open' ? 'default' : 'destructive'} className="uppercase shrink-0">
                            {scholarship.status}
                        </Badge>
                    )}
                </DialogTitle>
                <DialogDescription className="hidden">Detail Beasiswa</DialogDescription>
            </DialogHeader>

            {/* BODY */}
            {loadingDetail ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-neutral-500">Mengambil data...</p>
                </div>
            ) : !scholarship.id ? (
                <div className="p-10 text-center text-neutral-500">Data tidak ditemukan.</div>
            ) : (
                <Tabs defaultValue="detail" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-2 shrink-0 bg-white border-b">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="detail">Detail Informasi</TabsTrigger>
                            <TabsTrigger value="applicants">Pelamar ({applicants.length})</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* TAB 1: DETAIL INFORMASI */}
                    <TabsContent value="detail" className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 m-0">
                        {scholarship.image_url && (
                            <div className="w-full h-56 rounded-xl overflow-hidden shadow-sm border border-neutral-200 group">
                                <img src={scholarship.image_url} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        )}

                        {scholarship.organization && (
                            <div className="bg-white border rounded-xl p-5 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-5 items-start">
                                    <div className="w-20 h-20 shrink-0 border rounded-lg p-2 flex items-center justify-center bg-white shadow-sm">
                                        <img 
                                            src={scholarship.organization.logo_full_url} 
                                            alt="Logo Org" 
                                            className="w-full h-full object-contain"
                                            onError={(e) => {e.target.src = "https://via.placeholder.com/100?text=ORG"}} 
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-neutral-900">{scholarship.organization.name}</h3>
                                                <Badge variant="outline" className="text-[10px] h-5">{scholarship.organization.type || 'Organization'}</Badge>
                                            </div>
                                            <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{scholarship.organization.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            {scholarship.organization.website && (
                                                <a href={scholarship.organization.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
                                                    <Globe className="w-3.5 h-3.5" /> Website
                                                </a>
                                            )}
                                            {scholarship.organization.contact_email && (
                                                <a href={`mailto:${scholarship.organization.contact_email}`} className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md">
                                                    <Mail className="w-3.5 h-3.5" /> {scholarship.organization.contact_email}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600"><MapPin className="w-5 h-5"/></div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] uppercase font-bold text-neutral-400">Lokasi</p>
                                    <p className="text-sm font-semibold truncate" title={scholarship.location}>{scholarship.location}</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                <div className="bg-red-100 p-2 rounded-full text-red-600"><Calendar className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-400">Deadline</p>
                                    <p className="text-sm font-semibold">{formatDate(scholarship.deadline)}</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-full text-purple-600"><BookOpen className="w-5 h-5"/></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-400">Bidang Studi</p>
                                    <p className="text-sm font-semibold">{scholarship.study_field || 'Umum'}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-neutral-500"/> Deskripsi Program
                                </h4>
                                <div className="bg-white p-5 rounded-xl border text-sm text-neutral-700 whitespace-pre-line leading-7 shadow-sm">
                                    {scholarship.description || "-"}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-neutral-500"/> Fasilitas & Benefit
                                </h4>
                                <div className="bg-white p-5 rounded-xl border shadow-sm text-sm text-neutral-700 whitespace-pre-line leading-7">
                                    {scholarship.benefit || "-"}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB 2: PELAMAR (APPLICANTS) */}
                    <TabsContent value="applicants" className="flex-1 overflow-hidden flex flex-col m-0 bg-slate-50/30">
                        <ScrollArea className="flex-1 p-6">
                            {loadingApplicants ? (
                                <div className="flex justify-center py-10"><Loader2 className="animate-spin h-6 w-6 text-neutral-400"/></div>
                            ) : applicants.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-white/50">
                                    <User className="h-10 w-10 text-neutral-300 mb-2"/>
                                    <p className="text-sm text-neutral-500">Belum ada pelamar.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {applicants.map((app) => (
                                        <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all gap-4">
                                            <div className="flex gap-4 overflow-hidden items-center">
                                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                    <AvatarImage src={app.user?.avatar} />
                                                    <AvatarFallback className="bg-primary text-white font-bold">
                                                        {app.user?.name?.substring(0,2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                
                                                <div className="min-w-0 flex flex-col justify-center">
                                                    <h4 className="font-bold text-sm text-neutral-800 truncate">{app.user?.name}</h4>
                                                    <p className="text-xs text-neutral-500 truncate">{app.user?.email}</p>
                                                    
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                                                            Applied: {formatDate(app.created_at)}
                                                        </span>
                                                        
                                                        {/* Link CV Cepat */}
                                                        {(app.cv_url || app.cv_path) && (
                                                            <a href={app.cv_url || app.cv_path} target="_blank" rel="noreferrer" className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full hover:bg-blue-100 font-medium flex items-center gap-1 transition-colors">
                                                                <FileText className="h-3 w-3" /> CV
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0 ml-auto">
                                                {renderStatus(app.status)}
                                                
                                                <div className="flex gap-1">
                                                    {/* TOMBOL VIEW DETAIL */}
                                                    <Button 
                                                        size="sm" variant="outline" 
                                                        className="h-7 w-7 p-0 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                        onClick={() => handleViewDetail(app.id)}
                                                        title="Lihat Detail Pelamar"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </Button>

                                                    {/* TOMBOL ACCEPT/REJECT */}
                                                    {app.status === 'submitted' && (
                                                        <>
                                                            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleStatusChange(app.id, 'accepted')} title="Terima">
                                                                <Check className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusChange(app.id, 'rejected')} title="Tolak">
                                                                <X className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            )}
        </DialogContent>
        </Dialog>

        {/* INTEGRASI DIALOG DETAIL */}
        <ApplicationDetailDialog 
            open={detailOpen} 
            onOpenChange={setDetailOpen} 
            applicationId={selectedAppId} 
        />
    </>
  );
};