"use client";
import React, { useEffect, useState } from "react";
import { apiGet, AboutInfo, AboutApiResponse } from "@/utils";
import { AboutSkeleton } from "@/components/Skeletons";

const About: React.FC = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<AboutApiResponse>("/api/about")
      .then((data) => {
        setAboutInfo(data.aboutInfo);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !aboutInfo) {
    return (
      <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <AboutSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <section
          className="max-w-6xl mx-auto"
          aria-labelledby="about-title"
          tabIndex={-1}
        >
          <header className="text-center mb-16">
            <h1
              id="about-title"
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none"
            >
              {aboutInfo.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-4xl mx-auto leading-snug mb-6">
              {aboutInfo.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>

          {/* Restaurant History Section - FR-10 */}
          <section
            aria-labelledby="history-title"
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12 mb-12"
          >
            <h2
              id="history-title"
              className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-8 text-center"
            >
              Our Story
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-primary-700/30">
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-primary-900 dark:text-accent-200 mb-4">
                  Our Beginning
                </h3>
                <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg leading-relaxed">
                  {aboutInfo.history.founding}
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent-50/80 to-secondary-50/80 dark:from-accent-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-accent-700/30">
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-primary-900 dark:text-accent-200 mb-4">
                  Our Mission
                </h3>
                <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg leading-relaxed">
                  {aboutInfo.history.mission}
                </p>
              </div>

              <div className="bg-gradient-to-br from-secondary-50/80 to-primary-50/80 dark:from-secondary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-secondary-200/30 dark:border-secondary-700/30">
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-primary-900 dark:text-accent-200 mb-4">
                  Our Commitment
                </h3>
                <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg leading-relaxed">
                  {aboutInfo.history.commitment}
                </p>
              </div>
            </div>
          </section>

          {/* Founders Section - FR-11 */}

          <section
            aria-labelledby="founders-title"
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12"
          >
            <h2
              id="founders-title"
              className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-12 text-center"
            >
              Meet Our Founders
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {aboutInfo.founders.map((founder) => (
                <div
                  key={founder.id}
                  className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-primary-700/30 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="text-center mb-6">
                    <h3 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-primary-900 dark:text-accent-200 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-accent-600 dark:text-accent-400 font-roboto text-base md:text-lg font-semibold mb-4">
                      {founder.role}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-poppins font-semibold text-lg text-primary-900 dark:text-accent-200 mb-2">
                        Biography
                      </h4>
                      <p className="text-primary-700 dark:text-accent-300 font-roboto text-sm md:text-base leading-relaxed">
                        {founder.biography}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-poppins font-semibold text-lg text-primary-900 dark:text-accent-200 mb-2">
                        Specialties
                      </h4>
                      <p className="text-accent-600 dark:text-accent-400 font-roboto text-sm md:text-base italic">
                        {founder.specialties}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default About;
