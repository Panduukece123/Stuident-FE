import { ElearningCourseList } from "@/components/section/ElearningCourseList";
import { CourseCard } from "@/components/shared/CourseCard";
import React from "react";

const dummyCourses = [
  {
    title: "Intro to Web Development",
    description: "Belajar HTML, CSS, dan JavaScript dari dasar.",
    rating: 4.8,
    price: 50000
  },
  {
    title: "Mastering React",
    description: "Belajar React Hooks, State, dan Components.",
    rating: 4.9,
    price: 50000
  },
  {
    title: "UI/UX Fundamentals",
    description: "Dasar-dasar desain antarmuka dan pengalaman pengguna.",
    rating: 4.7,
    price: 50000
  },
  {
    title: "Backend dengan Node.js",
    description: "Membangun API menggunakan Express.js.",
    rating: 4.6,
    price: 50000
  },
  {
    title: "Intro to Web Development",
    description: "Belajar HTML, CSS, dan JavaScript dari dasar.",
    rating: 4.8,
    price: 50000
  },
  {
    title: "Mastering React",
    description: "Belajar React Hooks, State, dan Components.",
    rating: 4.9,
    price: 50000
  },
  {
    title: "UI/UX Fundamentals",
    description: "Dasar-dasar desain antarmuka dan pengalaman pengguna.",
    rating: 4.7,
    price: 50000
  },
  {
    title: "Backend dengan Node.js",
    description: "Membangun API menggunakan Express.js.",
    rating: 4.6,
    price: 50000
  },
  {
    title: "Intro to Web Development",
    description: "Belajar HTML, CSS, dan JavaScript dari dasar.",
    rating: 4.8,
    price: 50000
  },
  {
    title: "Mastering React",
    description: "Belajar React Hooks, State, dan Components.",
    rating: 4.9,
    price: 50000
  },
  {
    title: "UI/UX Fundamentals",
    description: "Dasar-dasar desain antarmuka dan pengalaman pengguna.",
    rating: 4.7,
    price: 50000
  },
  {
    title: "Backend dengan Node.js",
    description: "Membangun API menggunakan Express.js.",
    rating: 4.6,
    price: 50000
  },
];

export const MyProfileEnrolledCourse = ({ title, subtitle, courses }) => {
return (
<div>   
    <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">Enrolled Course</h1>
    </div>
    <div><ElearningCourseList
        title="Kursus Populer"
        subtitle="Pilih kursus terbaik untuk meningkatkan skill kamu"
        courses={dummyCourses}
      />
    </div>
    </div>
      );
}
