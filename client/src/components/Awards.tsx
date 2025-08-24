"use client";
import React from "react";
import type { Award } from "@/utils";

interface AwardsProps {
  awards: Award[];
}

const Awards: React.FC<AwardsProps> = ({ awards }) => {
  return (
    <section aria-labelledby="awards-title" className="mb-16">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
        <div className="mb-12">
          <h3
            id="awards-title"
            className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200"
          >
            Awards & Recognition
          </h3>
        </div>
        {awards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-primary-700/30 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <h4 className="font-poppins font-bold text-xl md:text-2xl text-primary-900 dark:text-accent-200 mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                      {award.title}
                    </h4>
                  </div>
                  <div className="flex justify-end">
                    <span className="inline-block bg-gradient-to-r from-accent-500 to-secondary-500 text-white font-poppins font-bold px-4 py-2 rounded-xl text-lg shadow-lg">
                      {award.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-12 text-center border border-accent-200/30 dark:border-primary-700/30">
            <p className="text-primary-700 dark:text-accent-300 italic font-roboto text-lg">
              No awards available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Awards;
