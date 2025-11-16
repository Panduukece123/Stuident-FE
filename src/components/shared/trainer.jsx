import React from "react";
import { Card, CardContent } from "../ui/card";
import BgInfo from "../../assets/images/bg-trainer.svg";

export const Trainer = () => {
  const trainers = [
    {
      name: "John Doe",
      education: "Computer Science",
      experience: "Senior Engineer at Google",
    },
    {
      name: "Jane Smith",
      education: "Data Science",
      experience: "Lead Data Scientist at Meta",
    },
    {
      name: "Michael Johnson",
      education: "Software Engineering",
      experience: "Tech Lead at Microsoft",
    },
    {
      name: "Sarah Williams",
      education: "AI/ML",
      experience: "Engineer at Amazon",
    },
    {
      name: "John Doe",
      education: "Computer Science",
      experience: "Senior Engineer at Google",
    },
    {
      name: "Jane Smith",
      education: "Data Science",
      experience: "Lead Data Scientist at Meta",
    },
    {
      name: "Michael Johnson",
      education: "Software Engineering",
      experience: "Tech Lead at Microsoft",
    },
    {
      name: "Sarah Williams",
      education: "AI/ML",
      experience: "Engineer at Amazon",
    },
  ];

  return (
    <div className="p-6 max-w-7xl">
      <Card
        className={"p-10 flex flex-row gap-10 relative overflow-hidden"}
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 w-full flex flex-row gap-10">
          <div className="w-1/4 flex flex-col gap-5 shrink-0">
            <h1 className="text-2xl font-semibold text-white">
              Belajar Langsung dari Para Pakar Industri
            </h1>
            <p className="text-justify text-white">
              Materi kami disusun dan dibawakan oleh para senior-level di
              bidangnya yang aktif bekerja di perusahaan teknologi terdepan.
            </p>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 min-w-max">
              {trainers.map((trainer, index) => (
                <Card
                  key={index}
                  className="w-52 shrink-0 bg-white overflow-hidden "
                >
                  <CardContent className="text-center px-3">
                    <img
                      src="https://placehold.co/300x200"
                      alt={trainer.name}
                      className="object-cover mb-2 rounded"
                    />
                    <h3 className="font-semibold text-lg">{trainer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {trainer.education}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {trainer.experience}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
