'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Reset email sent again! (This is a demo)');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">

        {/* Form or Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          {!isEmailSent ? (
            <>
              {/* Form Header */}
              <div className="text-center mb-6">
                {/* App Icon */}
                <Link href="/" className="inline-block mb-4">
                  <div className="w-12 h-12 bg-[#369e62] rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                    </svg>
                  </div>
                </Link>
                
                <h2 className="text-2xl font-bold text-[#111] mb-1">
                  Forgot Password?
                </h2>
                <p className="text-sm text-gray-600">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#369e62] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#008000] focus:ring-2 focus:ring-[#369e62] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending reset link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </motion.button>
              </form>
            </>
          ) : (
            /* Success State */
            <>
              {/* Success Header */}
              <div className="text-center mb-8">
                {/* App Icon */}
                <Link href="/" className="inline-block mb-6">
                  <div className="w-16 h-16 bg-[#369e62] rounded-xl flex items-center justify-center mx-auto">
                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                    </svg>
                  </div>
                </Link>
                
                <h2 className="text-3xl font-bold text-[#111] mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-600">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </p>
              </div>

              <div className="text-center space-y-6">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                {/* Success Message */}
                <div>
                  <h3 className="text-xl font-semibold text-[#111] mb-2">
                    Email Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Please check your email and follow the instructions to reset your password.
                  </p>
                  <p className="text-sm text-gray-500">
                    Didn&apos;t receive the email? Check your spam folder or try again.
                  </p>
                </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Resend Email'
                  )}
                </motion.button>

                <motion.button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  className="w-full text-[#369e62] hover:text-[#008000] font-semibold transition-colors duration-200"
                >
                  Use Different Email
                </motion.button>
              </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Back to Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link
              href="/login"
              className="text-[#369e62] hover:text-[#008000] font-semibold transition-colors duration-200"
            >
              Back to Sign In
            </Link>
          </p>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-1">Need Help?</h4>
              <p className="text-sm text-blue-700">
                If you&apos;re having trouble resetting your password, please contact our support team at{' '}
                <a href="mailto:support@absstore.com" className="font-medium hover:underline">
                  support@absstore.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
