import React from "react";
import { FileText, Upload, Trash2, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentRow = ({ 
  title, 
  required, 
  document, 
  onDelete, 
  onBrowse, 
  inputRef, 
  onChange, 
  standalone, 
  extraAction 
}) => (
  <div className={standalone ? "" : "mb-6"}>
    <input type="file" ref={inputRef} className="hidden" onChange={onChange} />
    
    {!standalone && (
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold text-gray-700 font-sans">{title}</span>
        {required && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold">Required!</span>}
      </div>
    )}
    
    {document ? (
      <div className="bg-[#EDF2F7] rounded-xl p-4 border border-gray-100 relative group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FileText className="text-gray-400" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-1">{document.name}</p>
              <div className="flex gap-4 text-[11px] text-gray-500">
                <span>Size <span className="ml-2 text-gray-800 font-medium">: {document.size}</span></span>
                <span>Type <span className="ml-2 text-gray-800 font-medium">: {document.type}</span></span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              if (document?.file) {
                const url = URL.createObjectURL(document.file);
                window.open(url, '_blank');
              }
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <ExternalLink size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onBrowse} className="cursor-pointer bg-white border-gray-200 text-gray-600 text-[11px] h-8 rounded-lg">
            <Pencil size={12} className="mr-1.5 text-gray-400" /> Change
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete} className="cursor-pointer bg-white border-red-100 text-red-500 hover:bg-red-50 text-[11px] h-8 rounded-lg">
            <Trash2 size={12} className="mr-1.5" /> Delete
          </Button>
          {extraAction}
        </div>
      </div>
    ) : (
      <div 
        onClick={onBrowse}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#3DBDC2] transition-colors cursor-pointer group"
      >
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-cyan-50 transition-colors">
          <Upload className="text-gray-400 group-hover:text-[#3DBDC2]" size={20} />
        </div>
        <p className="text-sm text-gray-500">Drag & drop your file here, or <span className="text-[#3DBDC2] font-bold">Browse Files</span></p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Supports PDF, DOC, DOCX (Max 2MB)</p>
      </div>
    )}
  </div>
);

export default DocumentRow;
