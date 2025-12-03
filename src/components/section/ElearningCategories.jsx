import React from "react";
import { Button } from "../ui/button";

export const ElearningCategories = ({ categories = [] }) => {
  return (
    <section className="py-12 px-6 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Pilihan E-Learning</h2>
        <p className="text-muted-foreground mb-8">
          Temukan ribuan kursus pilihan yang diajarkan oleh instruktur terbaik
          di bidangnya, semuanya dalam satu tempat.
        </p>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="w-8 h-8 bg-muted rounded-md mb-1"></div>{" "}
                {/* Icon Placeholder */}
                <span>{cat}</span>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada kategori tersedia.
          </p>
        )}
      </div>
    </section>
  );
};
