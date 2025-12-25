import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArticleList = ({ articles = [] }) => {
  const navigate = useNavigate();
  const mainArticles = articles.slice(0, 4);
  // Use the remaining articles for sidebar, or repeat if not enough (for demo purposes, but better to just show what we have)
  const sidebarArticles =
    articles.length > 4 ? articles.slice(4) : articles.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Grid Section - Left Side */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <div className="h-48 bg-gradient-to-b from-[#007EA7] to-[#003459] relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6 flex-grow px-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </CardContent>
                <CardFooter className="pb-6 px-6">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-gray-200 text-[#007EA7] hover:bg-[#007EA7]/5 hover:text-[#005F7F] h-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/article/${article.id}`);
                    }}
                  >
                    Baca Selengkapnya
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar List Section - Right Side */}
        <div className="lg:w-1/3 flex flex-col gap-3">
          {sidebarArticles.map((article, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate(`/article/${article.id}`)}
            >
              <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#007EA7] to-[#003459] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#007EA7] transition-colors line-clamp-3">
                {article.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-12 gap-4">
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-none border border-gray-400 hover:bg-gray-100"
        >
          <ChevronUp className="h-6 w-6 text-gray-800" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-none border border-gray-400 hover:bg-gray-100"
        >
          <ChevronDown className="h-6 w-6 text-gray-800" />
        </Button>
      </div>
    </div>
  );
};
