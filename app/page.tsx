"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Heart, Shield, Clock, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        r.push("/portal");
      } else {
        const errorData = await res.json();
        console.error("Login failed:", errorData.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Zealthy
              </h1>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
              Your Health,<br />
              <span className="text-emerald-600 dark:text-emerald-400">Simplified</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
              Access your medical records, manage appointments, and track prescriptions all in one secure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-sm">
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span className="text-gray-700 dark:text-gray-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Clock className="w-6 h-6 text-teal-600" />
              <span className="text-gray-700 dark:text-gray-300">24/7 Access</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-3xl p-8 space-y-8"
        >
          {/* Mobile Header */}
          <div className="text-center space-y-3 lg:hidden">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Zealthy
              </h1>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to your patient portal
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>


          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </motion.button>

          {/* Demo Credentials */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">Demo Credentials</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-300 font-mono">
                  mark@some-email-provider.net
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-300 font-mono">
                  Password123!
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <a
              href="/forgot-password"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors"
            >
              Forgot Password?
            </a>
            <p>
              Need help?{" "}
              <a
                href="/contact"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
