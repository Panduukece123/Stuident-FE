import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ArticleService from "@/services/ArticleService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => ArticleService.fetchArticleById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[400px] w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Article not found</h2>
        <Button onClick={() => navigate("/article")}>Back to Articles</Button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white gap-2"
            onClick={() => navigate("/article")}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Articles
          </Button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-12">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {article.category || "General"}
            </Badge>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author || "Admin"}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {/* If content is HTML, use dangerouslySetInnerHTML, otherwise just display text */}
            {/* Assuming content might be plain text or simple HTML for now */}
            <div
              dangerouslySetInnerHTML={{
                __html: article.content || article.description,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
