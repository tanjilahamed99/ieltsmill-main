"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { login, register } from "../../action/auth";
import { useAppDispatch } from "../../features/Store";
import { setCredentials } from "../../features/slice/auth/authSlice";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Full name is required";
      else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let res;
      if (!isLogin) {
        res = await register({ email: formData.email, password: formData.password, name: formData.name });
      } else {
        res = await login({ email: formData.email, password: formData.password });
      }

      if (!isLogin) setFormData({ email: "", password: "", name: "", confirmPassword: "" });
      
      localStorage.setItem("token", res.data.token);
      dispatch(setCredentials(res.data.user));
      router.push("/dashboard");
    } catch (error) {
      setErrors({ general: "Authentication failed. Please check your credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      
      {/* LEFT SIDE - Hero / Decoration */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12 order-2 lg:order-1">
        
        {/* Animated Background Gradients (Red/Orange Theme) */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.15),transparent_40%)]" />
        
        {/* Floating Glass Cards Container */}
        <div className="relative z-10 w-full max-w-lg space-y-6">
          
          {/* Hero Headline */}
          <div className="mb-10 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Potential.</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg">
              Master new skills, challenge yourself, and achieve your goals with confidence.
            </p>
          </div>

          {/* Feature Card 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Learn Faster</h3>
                <p className="text-slate-400 text-sm">Interactive lessons & quizzes</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
              </div>
              <p className="text-slate-400 text-xs text-right">80% Completion Rate</p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 ml-8 lg:ml-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-bold text-lg">Achieve Your Dreams</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join a community of ambitious learners and get the tools you need to succeed.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">+5,000 active learners</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 order-1 lg:order-2">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          
          {/* Brand */}
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              IELTS<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">-MILL</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Your Journey to Success Starts Here</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            
            {/* Tabs */}
            <div className="flex p-1.5 bg-slate-50/50">
              <button
                onClick={() => setIsLogin(true)}
                disabled={isLoading}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all duration-300 ${
                  isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                disabled={isLoading}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all duration-300 ${
                  !isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Field */}
                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-red-500/10 ${
                          errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-red-500"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-red-500/10 ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-red-500"
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-red-500/10 ${
                        errors.password ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-red-500"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-red-500/10 ${
                          errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-red-500"
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
                  </div>
                )}

                {/* Forgot Password */}
                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Error Banner */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                    {errors.general}
                  </div>
                )}

                {/* Submit Butto */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Please wait...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 font-medium">
            By continuing, you agree to our <a href="#" className="underline hover:text-slate-600">Terms</a> & <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;