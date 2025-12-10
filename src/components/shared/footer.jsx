import { Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import React from "react";
import Logo from "../../assets/images/stuident-logo.svg";

const navigation = [
  {
    title: "Program",
    links: [
      { label: "E-Learning", href: "#" },
      { label: "Bootcamp", href: "#" },
      { label: "My Mentor", href: "#" },
      { label: "Corporate Service", href: "#" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#" },
      { label: "Karier", href: "#" },
      { label: "Artikel", href: "#" },
      { label: "Kontak Kami", href: "#" },
    ],
  },
  {
    title: "Lainnya",
    links: [
      { label: "Pusat Bantuan / FAQ", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      { label: "Ketentuan Privasi", href: "#" },
    ],
  },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Twitter", icon: Twitter, href: "" },
  { label: "Youtube", icon: Youtube, href: "" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Email", icon: Mail, href: "mailto:hello@example.com" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-muted-foreground w-full">
      <div className="max-w-7xl mx-auto">

    
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm space-y-5">
            <div className="flex items-center gap-3 text-foreground">
              <div className="flex items-center gap-3">
                <img src={Logo} alt="Stuident" width={44} height={44} />
                <div>
                  <p className="text-base font-semibold">Stuident</p>
                  <p className="text-sm text-muted-foreground">
                    international student center
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Platform pembelajaran yang modern, responsif, dan mudah diakses
              oleh mahasiswa dan pekerja untuk mendapatkan informasi program
              terbaru.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-card-foreground transition hover:border-primary hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            {navigation.map(({ title, links }) => (
              <div key={title} className="space-y-3">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="transition hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Stuident. All rights reserved.</p>
        </div>
      </div>
        </div>
    </footer>
  );
};
