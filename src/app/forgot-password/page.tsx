"use client";

import { useState } from "react";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Firebase password reset logic will go here
      console.log("Reset password for:", email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2a2a2a] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ONESSA</h1>
            <p className="text-white/60 text-sm">
              Crafting Timeless Digital Experiences
            </p>
          </div>

          <div className="w-full h-[400px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
            <div className="text-center space-y-4 p-8">
              <div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                <Mail className="w-10 h-10 text-white/60" />
              </div>
              <p className="text-white/60 text-sm">
                We'll help you get back to creating
              </p>
            </div>
          </div>

          <p className="text-white/70 text-base leading-relaxed">
            Don't worry! It happens. Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>
      </div>

      {/* Right Side - White */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Sign In</span>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Forgot Password?
                </h2>
                <p className="text-gray-600">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {error && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Check Your Email
                </h2>
                
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to{" "}
                  <span className="font-semibold text-gray-900">{email}</span>
                </p>
                
                <p className="text-sm text-gray-500 mb-8">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setError("");
                    }}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    try again
                  </button>
                </p>

                <Link href="/login">
                  <button className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold hover:bg-gray-50 transition-all">
                    Back to Sign In
                  </button>
                </Link>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>© 2025 Onessa Inc.</span>
              <div className="flex gap-4">
                <Link href="/contact" className="hover:text-gray-900">
                  Contact Us
                </Link>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
