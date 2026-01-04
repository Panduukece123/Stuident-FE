import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
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
      {/* Header Image & Back Button (Tetap sama) */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-16">
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm font-medium text-gray-500">
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full">
              {article.category || "Education"}
            </Badge>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <span>{article.author || "Admin"}</span>
            </div>
          </div>

          {/* Title - Dibuat lebih elegan */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12 leading-[1.2] text-center max-w-4xl mx-auto">
            {article.title}
          </h1>

          <hr className="mb-12 border-gray-100" />

          <div className="article-content flex justify-center">
            <article className="prose prose-blue prose-lg md:prose-xl max-w-none 
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-li:text-gray-600
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-img:rounded-3xl prose-img:shadow-lg">
              
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl mt-12 mb-6 pb-2 border-b-2 border-blue-50 w-fit" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-3" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-blue-900 bg-blue-50/50 px-1 rounded" {...props} />,
                }}
              >
                {article.content || article.description}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
