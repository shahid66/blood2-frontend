// components/auth/LoginForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter(); // Initialize router
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);

    try {
      // Execute Better Auth sign-in method
      const { data, error } = await signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        // callbackURL: "/dashboard", // Tells Better Auth where to route on success
      });

      // Handle Better Auth Specific Errors (e.g., Wrong password, Invalid User)
      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back! Redirecting...");

      // Safety fallback route management if callbackURL is not handled implicitly
      setTimeout(() => {
        window.location.href = "/";
        // router.push("/");
        // router.refresh(); // Cleans up cached headers/server component routing configurations
      }, 1000);
    } catch (error) {
      console.error("Login unexpected error:", error);
      toast.error("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
      {/* ── Background Theme Accent Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#C62828]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-100 relative z-10"
      >
        {/* ── Theme Header / Brand Logo ── */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full bg-[#C62828]/10 flex items-center justify-center mb-3"
          >
            <FaHeartbeat className="w-6 h-6 text-[#C62828]" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your BloodBond donor platform
          </p>
        </div>

        {/* ── Form Section ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400">
                <FaEnvelope className="w-4 h-4" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C62828] focus:ring-4 focus:ring-[#C62828]/10 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-xs font-medium text-[#C62828] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400">
                <FaLock className="w-4 h-4" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C62828] focus:ring-4 focus:ring-[#C62828]/10 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#C62828] hover:bg-[#b22020] text-white text-sm font-semibold rounded-xl transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C62828]/20 hover:shadow-xl hover:shadow-[#C62828]/30"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* ── Footer Navigation links ── */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#C62828] font-semibold hover:underline"
          >
            Register to donate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}