import React, { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShareActionButtons = ({ 
  title = "Share Info", 
  text = "Check this out!", 
  url, 
  className = "" 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const targetUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  // --- Logic Copy ---
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // --- Logic Share ---
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: text,
      url: targetUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("User cancelled share", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`flex gap-3 w-full ${className}`}>
      {/* --- Tombol Copy --- */}
      <Button
        variant="outline"
        onClick={handleCopyLink}
        className={`
          flex-1 h-11 transition-all duration-300 ease-in-out border rounded-xl shadow-sm cursor-pointer group
          ${isCopied 
            ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700" 
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
          }
        `}
      >
        <div className="flex items-center gap-2 transform transition-transform duration-300">
          {isCopied ? (
            <>
              <div className="bg-green-100 p-1 rounded-full">
                <Check size={14} className="text-green-600" strokeWidth={3} />
              </div>
              <span className="font-semibold text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} className="transition-transform group-hover:scale-110" />
              <span className="font-medium text-sm">Copy Link</span>
            </>
          )}
        </div>
      </Button>

      {/* --- Tombol Share --- */}
      <Button
        variant="outline"
        onClick={handleShare}
        className="flex-1 h-11 bg-white border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 ease-in-out border rounded-xl shadow-sm group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Share2 size={18} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
          <span className="font-medium text-sm">Share</span>
        </div>
      </Button>
    </div>
  );
};

export default ShareActionButtons;