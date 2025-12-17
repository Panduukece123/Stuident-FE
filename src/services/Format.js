export const formatPrice = (price) => {
    // Default: Indonesia Rupiah (IDR)
    
    // Check if data is ready or not (or not available at all)
    if (price === undefined || price === null) return "Rp 0,00";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2, // Make sure to have ",00" at the end!
    }).format(price);
};

export const formatTimestamp = (dateString) => {
    // Check if data is ready or not (or not available at all)
    if (!dateString) return "-";

    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long", // "long" = lengkap (Desember); "short" = singkatan (Des)
        year: "numeric",
        hour: "numeric", // Hapus baris ini jika tidak ingin menampilkan jam
        minute: "numeric" // Hapus baris ini jika tidak ingin menampilkan menit
    }).format(date);
};

export const formatRelativeTime = (dateString) => {
    // Check if data is ready or not (or not available at all)
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    
    // Hitung selisih dalam detik
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Siapkan formatter bahasa Indonesia
    const rtf = new Intl.RelativeTimeFormat("id-ID", { numeric: "auto" });

    // Logika pembagian waktu
    if (diffInSeconds < 60) {
        return "baru saja";
    } else if (diffInSeconds < 3600) {
        // Menit (60 detik)
        return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
    } else if (diffInSeconds < 86400) {
        // Jam (3600 detik)
        return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
    } else if (diffInSeconds < 604800) {
        // Hari (86400 detik)
        return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
    } else if (diffInSeconds < 2419200) {
        // Minggu (kira-kira 4 minggu sebulan)
        return rtf.format(-Math.floor(diffInSeconds / 604800), "week");
    } else if (diffInSeconds < 29030400) {
         // Bulan
        return rtf.format(-Math.floor(diffInSeconds / 2419200), "month");
    } else {
        // Tahun
        return rtf.format(-Math.floor(diffInSeconds / 29030400), "year");
    }
};