import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProfileService from "@/services/ProfileService"; // Buat ambil data user
import authService from "@/services/AuthService";       // Buat simpan session

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    const saveUserAndRedirect = async (token) => {
      try {
        localStorage.setItem("token", token);

        const response = await ProfileService.getMe();
        const userData = response.data || response; 

        authService.saveSession(token, userData);
        window.location.href = "/";

      } catch (err) {
        console.error("Gagal ambil data user:", err);
        localStorage.removeItem("token");
        navigate("/login?error=get_user_failed");
      }
    };

    if (token) {
      saveUserAndRedirect(token);
    } else {
      console.error("Login Google Gagal:", error);
      navigate("/login?error=google_failed");
    }
  }, [searchParams, navigate]);

  return null; // Tetap blank biar cepat (sat-set)
};