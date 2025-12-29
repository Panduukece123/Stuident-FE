import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/services/AuthService";

// 1. Schema Validasi
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

export const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // 2. Setup Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit Manual
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const responseData = await authService.login(data);
      
      const token = responseData.data?.token || responseData.token || responseData.access_token;
      
      // Ambil data user untuk dicek role-nya
      const userData = responseData.data?.user || responseData.user;

      if (token) {
        localStorage.setItem("token", token);

        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
        }

        // --- LOGIC REDIRECT ---
        if (userData?.role === 'admin' || userData?.role === 'superadmin') {
            navigate("/admin/users");
        } else if (userData?.role === 'corporate') { 
            // Tambahkan kondisi ini 👇
            navigate("/corporate");
        } else {
            // Student & Mentor lari ke Home
            navigate("/");
        }
        // ----------------------

      } else {
        console.error("Token tidak ditemukan.");
        setError("email", {
          type: "manual",
          message: "Gagal login: Token tidak diterima.",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        Object.keys(validationErrors).forEach((field) => {
          setError(field, {
            type: "manual",
            message: validationErrors[field][0],
          });
        });
      } else if (error.response && error.response.status === 401) {
        setError("email", { type: "manual", message: "" });
        setError("password", {
          type: "manual",
          message: "Email atau password salah",
        });
      } else {
        setError("email", {
            type: "manual",
            message: "Terjadi kesalahan server.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Handle Google Login (Redirect Mode)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect?role=student";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row w-full gap-28 max-w-7xl px-30 pt-6">
        <div className="w-1/3 items-center flex justify-center">
          <img src="/avatar-auth.png" width={200} alt="avatar-auth" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-1/2 max-w-md justify-center"
        >
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl bg-linear-to-r from-[#074799] to-[#3DBDC2] bg-clip-text text-transparent">
              Hello, Stuideners
            </h1>
            <p className="text-muted-foreground">
              Masuk untuk melanjutkan ke akunmu
            </p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              disabled={isLoading}
              className={`h-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="contoh: email@domain.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-500 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              disabled={isLoading}
              className={`h-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="Masukkan password Anda"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500 font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 bg-linear-to-r from-[#074799] to-[#3DBDC2] cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>

          <div className="relative flex items-center justify-center text-xs text-muted-foreground">
            <span className="absolute bg-background px-2">
              atau masuk dengan
            </span>
            <hr className="w-full border-t border-gray-300" />
          </div>

          {/* TOMBOL GOOGLE */}
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
              className="mr-2"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Log In with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline cursor-pointer"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      
      {/* Wave Background */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 100 1440 220"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-auto block"
        >
          <defs>
            <linearGradient
              id="gradient-wave"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#074799" />
              <stop offset="100%" stopColor="#3DBDC2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient-wave)"
            fillOpacity="1"
            d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};