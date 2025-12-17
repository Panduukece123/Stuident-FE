import { Card } from "@/components/ui/card";
import { Item, ItemContent } from "@/components/ui/item";

export const TabCurriculum = ({ curriculums }) => {
  const sections = [...new Set(curriculums?.map((c) => c.section) || [])];

  return (
    <Card className="p-4 md:p-8 rounded-t-none border-t-0 shadow-none">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Kurikulum</h1>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-3">{section}</h2>
            <div className="space-y-2 md:ml-4">
              {curriculums
                ?.filter((c) => c.section === section)
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