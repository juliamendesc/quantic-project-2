"use client";
import React, { useEffect, useState } from "react";
import { apiGet, AboutInfo, AboutApiResponse } from "@/utils";
import Loading from "@/components/Loading";

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

  if (loading || !aboutInfo) return <Loading message="Loading about info..." />;

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

          <section
            aria-labelledby="founders-title"
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12"
          >
            <h2
              id="founders-title"
              className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-12 text-center"
            >
              Our Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {aboutInfo.founders.map((founder) => (
                <div
                  key={founder.id}
                  className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-primary-700/30 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="text-center">
                    <h3 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-primary-900 dark:text-accent-200 mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg lg:text-xl leading-relaxed">
                      {founder.role}
                    </p>
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
