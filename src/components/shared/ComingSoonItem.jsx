import React from "react";
import { GraduationCap } from "lucide-react";

const ComingSoonItem = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-[350px] min-w-[350px] shrink-0">
      {/* Ikon Topi Wisuda */}
      <GraduationCap size={175} stroke="#757575" strokeWidth={2} />

      <p className="text-3xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#074799] to-[#3DBDC2]">{name}</p>

      

      
    </div>
  );
};

export default ComingSoonItem;
