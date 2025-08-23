"use client";
import React, { useState } from "react";
import { apiPost, NewsletterApiResponse } from "@/utils";
import { useLoading } from "@/hooks";
import { useToasterContext } from "@/contexts/ToasterContext";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();
  const { showSuccess, showError } = useToasterContext();

  // Email validation function (FR-15)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Client-side validation (FR-15)
    if (!trimmedEmail) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    startLoading();

    try {
      const data = await apiPost<NewsletterApiResponse>("/api/newsletter", {
        email: trimmedEmail,
      });
      stopLoading();
      showSuccess(data.message);
      setEmail(""); // Clear form on success
    } catch (error: unknown) {
      stopLoading();
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error subscribing to newsletter. Please try again.";
      showError(errorMessage);
    }
  };

  return (
    <section className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 via-accent-50/50 to-secondary-100/50 dark:from-primary-900/20 dark:via-neutral-800/20 dark:to-secondary-900/20 rounded-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/95 via-primary-25 to-accent-25 dark:from-neutral-800/95 dark:via-primary-900/95 dark:to-neutral-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary-200/60 dark:border-primary-700/60 overflow-hidden">
          {/* Elegant pattern overlay */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 border border-accent-400 rounded-full"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border border-secondary-400 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border border-primary-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 border border-accent-300 rounded-full"></div>
          </div>

          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16">
            <form
              onSubmit={handleSubmit}
              className="newsletter-signup"
              aria-labelledby="newsletter-title"
            >
              <fieldset className="border-0">
                {/* Header section */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-secondary-400 rounded-2xl mb-6 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <h3
                    id="newsletter-title"
                    className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight"
                  >
                    Exclusive Culinary Journey
                  </h3>

                  <p className="text-xl md:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-3xl mx-auto leading-relaxed mb-8">
                    Join our community of gastronomy enthusiasts and receive
                    exclusive insights into our chef&apos;s creations, seasonal
                    specialties, and intimate dining experiences
                  </p>

                  <div className="flex justify-center items-center space-x-2 mb-8">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-accent-400 via-secondary-400 to-primary-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full"></div>
                  </div>
                </div>

                {/* Form section */}
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-8 border border-primary-200/40 dark:border-primary-700/40 shadow-xl">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-3">
                        <label
                          className="block font-poppins font-bold text-primary-800 dark:text-accent-200 text-sm uppercase tracking-[0.15em] mb-3"
                          htmlFor="newsletter-email"
                        >
                          Your Email Address
                        </label>
                        <div className="relative">
                          <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            placeholder="chef@example.com"
                            className={`w-full px-8 py-5 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-500 font-roboto bg-white/90 dark:bg-neutral-700/90 text-primary-900 dark:text-accent-100 placeholder-primary-400 dark:placeholder-neutral-400 text-lg shadow-inner backdrop-blur-sm hover:shadow-lg ${
                              emailError
                                ? "border-red-400 dark:border-red-500 focus:ring-red-400/40 focus:border-red-500"
                                : "border-primary-200/60 dark:border-primary-600/60 focus:ring-accent-400/40 focus:border-accent-500 hover:border-accent-400/60"
                            }`}
                            aria-required="true"
                            aria-invalid={!!emailError}
                            aria-describedby={
                              emailError ? "email-error" : undefined
                            }
                          />
                          {emailError && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <svg
                                className="w-5 h-5 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        {emailError && (
                          <p
                            id="email-error"
                            className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center mt-2"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {emailError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="group relative bg-gradient-to-r from-accent-500 via-secondary-500 to-accent-600 hover:from-accent-600 hover:via-secondary-600 hover:to-accent-700 disabled:from-neutral-400 disabled:via-neutral-400 disabled:to-neutral-500 text-white font-poppins font-bold py-5 px-10 rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] w-full md:w-auto md:min-w-[160px] overflow-hidden"
                        disabled={!email.trim() || !!emailError || loading}
                        aria-label="Subscribe to newsletter"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>{loading ? "Subscribing..." : "Join Us"}</span>
                          {!loading && (
                            <svg
                              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          )}
                        </span>

                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-600 via-secondary-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Subtle animation overlay */}
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
