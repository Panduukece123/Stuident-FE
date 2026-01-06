import { Card } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Info } from "lucide-react";

export const TabCurriculum = ({ course }) => {
  const sections = [ ...new Set( course.curriculums?.map((c) => c.section) || [] ) ];

  return (
    <Card className="p-4 md:p-8 rounded-t-none border-t-0 shadow-none">
      <h1 className="text-xl md:text-2xl font-semibold">Kurikulum</h1>

      <div className="space-y-4">
        {sections.length === 0 && (
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <Info />
            </ItemMedia>
            <ItemContent>
              <p className="italic text-muted-foreground">Kurikulum tidak tersedia.</p>
            </ItemContent>
          </Item>
        )}
        {sections.map((section, index) => (
          <div key={index}>
            {/* Section */}
            <h2 className="text-lg font-semibold mb-3">{section}</h2>

            {/* Section's Curriculums */}
            <div className="space-y-2 md:ml-4">
              {course.curriculums?.filter((c) => c.section === section)
                .map((item) => (
                  <Item key={item.id} variant="outline" size="sm" className="transition-transform hover:scale-[1.01]">
                    <ItemContent>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm font-light mt-1">{item.description}</p>
                    </ItemContent>
                  </Item>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};