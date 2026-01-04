import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const ArticleBanner = ({ article }) => {
  const navigate = useNavigate();
  if (!article) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {article.title}
          </h1>
          <div className="text-gray-600 leading-relaxed text-lg line-clamp-3">
            <div className="article-content">
              <ReactMarkdown>{article.description}</ReactMarkdown>
            </div>
          </div>
          <Button
            className=" cursor-pointer rounded-full px-8 py-6 text-base font-medium bg-white text-[#007EA7] border-2 border-[#E5E7EB] hover:bg-gray-50 hover:text-[#005F7F] transition-colors shadow-sm"
            variant="outline"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            Baca Selengkapnya
          </Button>
        </div>
        <div
          className="w-full md:w-1/2 lg:w-5/12 aspect-video md:aspect-[4/3] rounded-2xl shadow-inner md:order-last order-first overflow-hidden cursor-pointer"
          onClick={() => navigate(`/article/${article.id}`)}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
