import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleService from "@/services/ArticleService";
import { ArticleBanner } from "@/pages/article/ArticleBanner";
import { ArticleList } from "@/pages/article/ArticleList";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ArticlePage = () => {
  const [category, setCategory] = useState("all");

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", category],
    queryFn: () => ArticleService.fetchArticles({ category }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-8 space-y-8">
        <div className="w-full max-w-7xl mx-auto">
          <Skeleton className="h-[400px] w-full rounded-[2rem]" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[300px] rounded-3xl" />
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20">Failed to load articles.</div>;
  }

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const listArticles = articles.length > 0 ? articles.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {featuredArticle && <ArticleBanner article={featuredArticle} />}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
        <div className="w-[200px]">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="scholarship">Scholarship</SelectItem>
              <SelectItem value="testimonial">Testimonial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ArticleList articles={listArticles} />
    </div>
  );
};
