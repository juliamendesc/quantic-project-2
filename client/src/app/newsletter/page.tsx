import NewsletterSignup from "@/components/NewsletterSignup";
import type { Metadata } from "next";
import { RESTAURANT_INFO, STATIC_CONTENT } from "@/constants";

export const metadata: Metadata = {
  title: `Newsletter Signup | ${RESTAURANT_INFO.name}`,
  description:
    "Join our culinary community and receive exclusive insights, seasonal specialties, and intimate dining experiences from Café Fausse.",
  keywords:
    "newsletter, culinary, restaurant updates, exclusive offers, seasonal menu, Chef Antonio",
};

export default function NewsletterPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <main
          className="max-w-7xl mx-auto"
          aria-labelledby="newsletter-page-title"
        >
          <header className="text-center mb-16">
            <h1
              id="newsletter-page-title"
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none"
            >
              {STATIC_CONTENT.newsletter.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-4xl mx-auto leading-snug mb-6">
              {STATIC_CONTENT.newsletter.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>

          <section
            aria-label="Newsletter Signup Form"
            className="max-w-4xl mx-auto"
          >
            <NewsletterSignup />
          </section>

          {/* Additional Benefits Section */}
          <section className="mt-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STATIC_CONTENT.newsletter.benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-secondary-400 rounded-full mx-auto flex items-center justify-center mb-4">
                    {benefit.icon === "clock" && (
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {benefit.icon === "lock" && (
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    )}
                    {benefit.icon === "lightbulb" && (
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
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-primary-900 dark:text-accent-200 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-700 dark:text-accent-300 font-roboto">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
