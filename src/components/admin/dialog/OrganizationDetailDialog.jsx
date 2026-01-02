import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe } from "lucide-react";

export const OrganizationDetailDialog = ({ open, onOpenChange, organization }) => {

  // Helper URL Gambar
  const getLogoUrl = (path) => {
    if (!path) return null;
    // 1. Cek kalau Absolute URL (https://...)
    if (path.startsWith("http") || path.startsWith("https")) {
        return path;
    }
    // 2. Kalau Relative Path, tempel base URL Storage Laravel
    const baseUrl = "http://localhost:8000/storage/"; 
    // Hapus slash di awal kalau ada, biar gak dobel
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        
        <DialogHeader>
          <DialogTitle>Organization Detail</DialogTitle>
          <DialogDescription>
            Information about the organization entity.
          </DialogDescription>
        </DialogHeader>

        {!organization ? (
           <div className="py-8 text-center text-gray-500">Loading details...</div>
        ) : (
          <div className="grid gap-6 py-4">
            
            {/* --- 1. LOGO & HEADER INFO --- */}
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
               {/* Logo Box */}
               <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-gray-50 flex items-center justify-center">
                  {/* PERBAIKAN DI SINI: Pakai organization.logo_url */}
                  {organization.logo_url ? (
                     <img 
                       src={getLogoUrl(organization.logo_url)} 
                       alt="logo" 
                       className="h-full w-full object-contain"
                       onError={(e) => {
                          e.target.style.display = 'none'; // Sembunyiin kalau error
                          e.target.nextSibling.style.display = 'block'; // Munculin icon fallback
                       }}
                     />
                  ) : (
                     <Building2 className="h-10 w-10 text-gray-300" />
                  )}
                  {/* Fallback Icon (Hidden by default) */}
                  <Building2 className="h-10 w-10 text-gray-300 hidden" />
               </div>

               {/* Name & Type */}
               <div className="space-y-1">
                  <h3 className="text-xl font-bold leading-none text-gray-900">
                    {organization.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <Badge variant={organization.type === 'company' ? "default" : "secondary"} className="capitalize">
                        {organization.type}
                    </Badge>
                  </div>
                  {/* Cek Website kalau ada */}
                  {organization.website && (
                      <a href={organization.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center justify-center sm:justify-start gap-1 pt-1">
                        <Globe className="h-3 w-3" /> {organization.website}
                      </a>
                  )}
                  {!organization.website && (
                      <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1 pt-1">
                         <Globe className="h-3 w-3" /> Public Entity
                      </p>
                  )}
               </div>
            </div>

            {/* --- 2. DESCRIPTION --- */}
            <div className="space-y-2 border-t pt-4">
               <h4 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                 Description
               </h4>
               <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2">
                 {organization.description || "No description provided."}
               </div>
            </div>

            {/* --- 3. (Optional) CONTACT INFO --- */}
            {(organization.location || organization.contact_email || organization.phone) && (
                <div className="grid grid-cols-2 gap-4 border-t pt-4 text-xs text-gray-500">
                    {organization.location && (
                        <div>
                            <span className="font-semibold block text-gray-700">Location</span>
                            {organization.location}
                        </div>
                    )}
                    {organization.contact_email && (
                        <div>
                            <span className="font-semibold block text-gray-700">Email</span>
                            {organization.contact_email}
                        </div>
                    )}
                </div>
            )}

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};