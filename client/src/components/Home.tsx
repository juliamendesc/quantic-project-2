import React from "react";
import ImageComponent from "@/components/ImageComponent";
import NewsletterSignup from "@/components/NewsletterSignup";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* FR-1: Display Café Fausse's name prominently */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-4 tracking-tight leading-none">
            Café Fausse
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-5xl mx-auto leading-snug mb-6">
            A unique gastronomic experience that combines tradition and
            innovation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
        </header>

        {/* FR-3: Include high-quality images and a consistent theme */}
        <section className="mb-16">
          <div className="relative bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 h-[400px] md:h-[600px] lg:h-[700px] group">
            <ImageComponent
              src="/home-cafe-fausse.webp"
              alt="Café Fausse restaurant interior"
              width={1200}
              height={600}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority={true}
              placeholderText="Café Fausse"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-2xl md:text-4xl font-poppins font-bold text-white mb-2 drop-shadow-lg">
                Elegance Redefined
              </h2>
              <p className="text-lg md:text-xl text-accent-100 font-roboto drop-shadow-md">
                Where culinary artistry meets sophisticated ambiance
              </p>
            </div>
          </div>
        </section>

        <NewsletterSignup />
      </div>
    </div>
  );
};

export default Home;
