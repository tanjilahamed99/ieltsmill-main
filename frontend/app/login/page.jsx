"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Full name is required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add your authentication logic here

      let res;

      if (!isLogin) {
        res = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
      } else {
        res = await login({
          email: formData.email,
          password: formData.password,
        });
      }

      // Reset form after successful submission (for demo)
      if (!isLogin) {
        setFormData({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        });
      }
      // Store only token
      localStorage.setItem("token", res.data.token);
      // User in Redux
      dispatch(setCredentials(res.data.user));
      router.push("/dashboard");
    } catch (error) {
      setErrors({ general: "Authentication failed. Please try again." });
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            ILTSMILL
          </h1>
          <p className="text-muted mt-2">Master Your IELTS Journey</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              disabled={isLoading}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "bg-white text-text hover:bg-gray-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              disabled={isLoading}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "bg-white text-text hover:bg-gray-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
              Sign Up
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white text-text ${
                        errors.name ? "border-red-500" : "border-border"
                      }`}
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white text-text ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white text-text ${
                      errors.password ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={isLoading}>
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted hover:text-text" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted hover:text-text" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white text-text ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-border"
                      }`}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-secondary transition-colors">
                    Forgotten Password?
                  </a>
                </div>
              )}

              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? "Logging in..." : "Signing up..."}</span>
                  </div>
                ) : (
                  <span>{isLogin ? "Login" : "Sign Up"}</span>
                )}
              </button>
            </form>

            <p className="text-center text-muted mt-6">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                disabled={isLoading}
                className="text-primary hover:text-secondary font-semibold transition-colors disabled:opacity-50">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted text-sm mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
