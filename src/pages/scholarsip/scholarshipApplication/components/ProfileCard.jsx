import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfileService from "@/services/ProfileService";

const ProfileCard = ({ profile }) => (
  <Card className="mb-8 border-none shadow-sm overflow-hidden">
    <CardContent className="p-6">
      <h2 className="text-base font-bold text-gray-800 mb-4">Profile</h2>
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#074799] to-[#3DBDC2] p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-6 z-10">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarImage src={ProfileService.getAvatarUrl(profile)} />
            <AvatarFallback className="bg-white text-[#3DBDC2] text-xl font-bold">
              {profile?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight">{profile?.name || "User Name"}</h3>
            <div className="grid grid-cols-[80px_1fr] text-xs gap-y-1 opacity-90">
              <span className="font-medium">Address</span>
              <span>: {profile?.address || "-"}</span>
              <span className="font-medium">Email</span>
              <span className="underline decoration-white/30 truncate">{profile?.email || "-"}</span>
              <span className="font-medium">Telephone</span>
              <span>: {profile?.phone || "-"}</span>
            </div>
          </div>
        </div>

        <Button 
          asChild
          variant="outline" 
          className="z-10 bg-white/10 border-white/40 text-white hover:bg-white/20 rounded-xl px-6"
        >
          <Link to="/profile/my-profile">
            Edit Profile
          </Link>
        </Button>

        {/* Decorative Circle */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
      </div>
      <p className="text-[10px] text-gray-400 text-right mt-3 italic">
        This profile will be used for this scholarship registration
      </p>
    </CardContent>
  </Card>
);

export default ProfileCard;
