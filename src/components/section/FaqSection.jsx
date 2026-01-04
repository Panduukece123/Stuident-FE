import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const Faq = () => {
  return (
    <div className="p-6 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4 ">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <div className="mx-auto h-1 w-100 rounded-full bg-primary" />
          
          {/* --- INI TEKS TAMBAHANNYA --- */}
          {/* Saya kasih margin-top (mt-4) biar ada jarak dikit dari garis */}
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Temukan jawaban cepat untuk pertanyaan umum seputar program, mentor, 
            dan cara belajar di Stuident. Masih bingung? Jangan ragu hubungi kami.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={
                "text-lg cursor-pointer hover:no-underline hover:text-primary"
              }
            >
              Apa itu Stuident?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-base font-light">
              <p>
                Stuident adalah platform edukasi online yang fokus menjembatani
                kesenjangan antara teori akademis dan kebutuhan industri. Kami
                menyediakan E-learning mandiri, Bootcamp intensif, dan sesi
                mentoring 1-on-1 yang dibimbing langsung oleh praktisi ahli.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className={
                "text-lg cursor-pointer hover:no-underline hover:text-primary"
              }
            >
              Siapa saja yang menjadi pengajar di sini?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-base font-light">
              <p>
                Semua instruktur dan mentor kami adalah profesional senior dan
                praktisi ahli yang aktif bekerja di perusahaan teknologi terdepan
                (seperti Gojek, DANA, Shopee, dll.). Anda tidak hanya belajar
                teori, tapi juga "rahasia dapur" dan studi kasus nyata dari
                mereka.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              className={
                "text-lg cursor-pointer hover:no-underline hover:text-primary"
              }
            >
              Apakah program ini cocok untuk saya yang masih pemula?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-base font-light">
              <p>
                Tentu! Kami memiliki alur belajar yang dirancang untuk semua
                level. Setiap program (E-Learning atau Bootcamp) akan mencantumkan
                "Level" (misal: Pemula, Menengah) dan prasyarat yang dibutuhkan
                (jika ada) di halaman deskripsinya.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              className={
                "text-lg cursor-pointer hover:no-underline hover:text-primary"
              }
            >
              Apa perbedaan utama antara E-Learning dan Bootcamp
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-base font-light">
              <p>
                E-Learning (Video Course): Adalah program belajar mandiri. Anda
                bisa mengakses video materi kapan saja (on-demand), di mana saja,
                dan belajar sesuai kecepatan Anda sendiri.
              </p>
              <p>
                Bootcamp (Live Class): Adalah program intensif terjadwal (misal: 8
                minggu) via Zoom. Anda akan belajar interaktif, mendapat bimbingan
                mentor, mengerjakan proyek portofolio, dan berdiskusi langsung
                dengan pengajar serta peserta lain.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger
              className={
                "text-lg cursor-pointer hover:no-underline hover:text-primary"
              }
            >
              Apakah saya akan mendapatkan sertifikat setelah menyelesaikan
              program?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-base font-light">
              <p>
                Ya. Anda akan mendapatkan Certificate of Completion (Sertifikat
                Penyelesaian) resmi dari [Nama Platform Anda] setelah Anda
                menyelesaikan semua materi di E-Learning atau dinyatakan lulus
                dari program Bootcamp.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};