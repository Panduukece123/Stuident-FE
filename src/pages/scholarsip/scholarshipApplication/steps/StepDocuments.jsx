import React, { useEffect } from "react";
import { Upload, Pencil, Link2, FileCheck, AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DocumentRow from "../components/DocumentRow";
import { Link } from "react-router-dom";

const StepDocuments = ({
  documents,
  motivationMode,
  motivationText,
  setMotivationMode,
  setMotivationText,
  handleDeleteDocument,
  cvInputRef,
  transcriptInputRef,
  recommendationInputRef,
  motivationInputRef,
  handleFileChange,
  onReset,
  onContinue,
  isPending,
  profileCv,       
  onUseProfileCv,  
}) => {
  // Auto-sync CV dari profile saat component mount
  useEffect(() => {
    if (profileCv?.cv_url && !documents.cv) {
      // Otomatis gunakan CV dari profil
      onUseProfileCv();
    }
  }, [profileCv, documents.cv, onUseProfileCv]);

  // Check apakah ada CV di profile
  const hasCvInProfile = !!profileCv?.cv_url;

  return (
    <Card className="mb-8 border-none shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-base font-bold text-gray-800 mb-6 font-sans">Documents Requirement</h2>
        
        <div className="space-y-6">
          {/* CV Section with Profile Sync */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 font-sans">Curriculum Vitae</span>
                <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold">Required!</span>
              </div>
            </div>
            
            {/* Kondisi: Jika TIDAK ADA CV di profile */}
            {!hasCvInProfile ? (
              <div className="flex flex-col gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      CV Belum Tersedia
                    </p>
                    <p className="text-xs text-amber-700 mb-3">
                      Anda harus mengupload CV di halaman Profile terlebih dahulu sebelum dapat melamar beasiswa.
                    </p>
                    <Link to="/profile/my-profile">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-8 border-amber-400 text-amber-700 hover:bg-amber-100"
                      >
                        <ExternalLink size={14} className="mr-1.5" />
                        Upload CV di Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Info CV sudah di-sync dari profil */}
                {documents.cv?.fromProfile && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <FileCheck size={16} className="text-green-600" />
                    <span className="text-xs text-green-700">CV otomatis di-sync dari profil Anda</span>
                  </div>
                )}
                
                {/* Document Row hanya muncul jika ada CV di profile */}
                <DocumentRow 
                  standalone
                  readonly={true}
                  document={documents.cv}
                />
                
                {/* Tombol untuk resync dari profile jika user hapus CV */}
                {!documents.cv && profileCv?.cv_url && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onUseProfileCv}
                    className="text-xs h-8 border-primary/30 text-primary hover:bg-primary/5 mt-2"
                  >
                    <Link2 size={14} className="mr-1.5" />
                    Gunakan CV dari Profil
                  </Button>
                )}
              </>
            )}
          </div>

          <DocumentRow 
            title="Grade Transcripts" 
            document={documents.transcript}
            onDelete={() => handleDeleteDocument("transcript")}
            onBrowse={() => transcriptInputRef.current.click()}
            inputRef={transcriptInputRef}
            onChange={(e) => handleFileChange("transcript", e)}
          />
          <DocumentRow 
            title="Recommendation Letter" 
            document={documents.recommendation}
            onDelete={() => handleDeleteDocument("recommendation")}
            onBrowse={() => recommendationInputRef.current.click()}
            inputRef={recommendationInputRef}
            onChange={(e) => handleFileChange("recommendation", e)}
          />

          {/* Motivational Letter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-gray-700">Motivational Letter</span>
            </div>
            {motivationMode === "file" ? (
              <DocumentRow 
                standalone
                document={documents.motivation_letter}
                onDelete={() => handleDeleteDocument("motivation_letter")}
                onBrowse={() => motivationInputRef.current.click()}
                inputRef={motivationInputRef}
                onChange={(e) => handleFileChange("motivation_letter", e)}
              
              />
            ) : (
              <div className="space-y-3">
                <Textarea 
                  placeholder="Type your motivation here..." 
                  className="min-h-[150px] bg-gray-50 border-gray-200 focus:ring-[#3DBDC2]"
                  value={motivationText}
                  onChange={(e) => setMotivationText(e.target.value)}
                />
                <Button variant="outline" size="sm" onClick={() => setMotivationMode("file")} className="text-xs">
                  <Upload size={14} className="mr-2" /> Switch to File Upload
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          <Button 
            onClick={onReset}
            className="px-8 py-5 bg-[#FF5C5C] hover:bg-red-600 rounded-xl text-white font-bold cursor-pointer"
          >
            Reset
          </Button>
          
          <p className="text-[11px] text-gray-400 text-center flex-1 px-4">
            {!hasCvInProfile 
              ? "Upload CV di Profile terlebih dahulu untuk melanjutkan!"
              : "Please make sure the document is uploaded correctly before continue!"
            }
          </p>
          
          <Button 
            onClick={onContinue}
            disabled={isPending || !hasCvInProfile}
            className="px-8 py-5 bg-[#3DBDC2] hover:bg-[#34a9ad] rounded-xl text-white font-bold shadow-lg shadow-[#3DBDC2]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepDocuments;
