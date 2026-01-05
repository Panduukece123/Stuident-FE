import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Loader2, FileText, BookOpen, Star, Wallet, GraduationCap
} from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const ApplicationDetailDialog = ({ open, onOpenChange, applicationId }) => {
    const token = localStorage.getItem("token");

    // FETCH DETAIL APLIKASI PELAMAR
    const { data: rawData, isLoading } = useQuery({
        queryKey: ["application-detail", applicationId],
        queryFn: async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/scholarship-applications/${applicationId}/detail`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Gagal mengambil detail aplikasi");
            return response.json();
        },
        enabled: !!applicationId && open,
    });

    const app = rawData?.data || {};
    const user = app?.user || {};

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    };

    const openDoc = (url) => {
        if(url) window.open(url, '_blank');
        else alert("Dokumen tidak ditemukan");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detail Pelamar</DialogTitle>
                    <DialogDescription>Informasi lengkap aplikasi beasiswa.</DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-neutral-500">Memuat data pelamar...</p>
                    </div>
                ) : !app.id ? (
                    <div className="text-center py-10 text-neutral-500">Data tidak ditemukan.</div>
                ) : (
                    <div className="space-y-6">
                        
                        {/* 1. HEADER PROFILE */}
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-primary text-white text-xl font-bold">
                                    {user.name?.substring(0,2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold text-neutral-900">{user.name}</h3>
                                <p className="text-sm text-neutral-500">{user.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs bg-white">{user.gender || 'N/A'}</Badge>
                                    <span className="text-xs text-neutral-400">•</span>
                                    <span className="text-xs text-neutral-500">{user.phone || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. INFORMASI AKADEMIK & EKONOMI */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                                        <GraduationCap className="w-4 h-4" /> Akademik
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-neutral-500 text-xs">Universitas</p>
                                        <p className="font-medium truncate" title={app.university}>{app.university || '-'}</p>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-neutral-500 text-xs">IPK (GPA)</p>
                                        <p className="font-medium">{app.gpa || '0.00'}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                                        <Wallet className="w-4 h-4" /> Ekonomi
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-neutral-500 text-xs">Penghasilan Orang Tua</p>
                                        <p className="font-medium">{formatCurrency(app.parent_income || 0)}</p>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-neutral-500 text-xs">Beasiswa Lain?</p>
                                        <Badge variant={app.has_other_scholarship ? "destructive" : "secondary"} className="text-[10px]">
                                            {app.has_other_scholarship ? "Ya, Menerima" : "Tidak Ada"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 3. DOKUMEN PENDUKUNG */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <FileText className="w-4 h-4 text-neutral-500"/> Dokumen Pendukung
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button variant="outline" className="justify-start h-auto py-3 gap-3 border-neutral-200 hover:bg-blue-50 hover:border-blue-200" onClick={() => openDoc(app.cv_url || app.cv_path)}>
                                    <div className="bg-blue-100 p-2 rounded text-blue-600"><FileText className="w-4 h-4"/></div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-neutral-700">Curriculum Vitae</div>
                                        <div className="text-[10px] text-neutral-400">Klik untuk melihat</div>
                                    </div>
                                </Button>

                                <Button variant="outline" className="justify-start h-auto py-3 gap-3 border-neutral-200 hover:bg-orange-50 hover:border-orange-200" onClick={() => openDoc(app.motivation_letter_url || app.motivation_letter)}>
                                    <div className="bg-orange-100 p-2 rounded text-orange-600"><FileText className="w-4 h-4"/></div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-neutral-700">Motivation Letter</div>
                                        <div className="text-[10px] text-neutral-400">Klik untuk melihat</div>
                                    </div>
                                </Button>

                                <Button variant="outline" className="justify-start h-auto py-3 gap-3 border-neutral-200 hover:bg-purple-50 hover:border-purple-200" onClick={() => openDoc(app.transcript_url || app.transcript_path)}>
                                    <div className="bg-purple-100 p-2 rounded text-purple-600"><BookOpen className="w-4 h-4"/></div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-neutral-700">Transkrip Nilai</div>
                                        <div className="text-[10px] text-neutral-400">Klik untuk melihat</div>
                                    </div>
                                </Button>

                                <Button variant="outline" className="justify-start h-auto py-3 gap-3 border-neutral-200 hover:bg-green-50 hover:border-green-200" onClick={() => openDoc(app.recommendation_url || app.recommendation_path)}>
                                    <div className="bg-green-100 p-2 rounded text-green-600"><Star className="w-4 h-4"/></div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-neutral-700">Surat Rekomendasi</div>
                                        <div className="text-[10px] text-neutral-400">Klik untuk melihat</div>
                                    </div>
                                </Button>
                            </div>
                        </div>

                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};