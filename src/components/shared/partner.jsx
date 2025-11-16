import React from "react";

const partners = [
  { logo: "https://placehold.co/120x60?text=Google" },
  { logo: "https://placehold.co/120x60?text=Microsoft" },
  { logo: "https://placehold.co/120x60?text=Amazon" },
  { logo: "https://placehold.co/120x60?text=Meta" },
  { logo: "https://placehold.co/120x60?text=Netflix" },
  { logo: "https://placehold.co/120x60?text=Apple" },
  { logo: "https://placehold.co/120x60?text=Google" },
  { logo: "https://placehold.co/120x60?text=Microsoft" },
  { logo: "https://placehold.co/120x60?text=Amazon" },
  { logo: "https://placehold.co/120x60?text=Meta" },
  { logo: "https://placehold.co/120x60?text=Netflix" },
  { logo: "https://placehold.co/120x60?text=Apple" },
  // Tambah lagi jika perlu
];

export const Partner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-10 items-center">
        <h1 className="text-2xl font-semibold text-center">
          Partner Perusahaan
        </h1>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {partners.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center bg-white shadow rounded-lg p-3"
          >
            <img src={item.logo} alt={item.name} className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};
