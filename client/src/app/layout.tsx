import type { Metadata, Viewport } from "next";
import { Poppins, Roboto } from "next/font/google";
import "@/app/globals.css";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ToasterContainer from "@/components/ToasterContainer";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Café Fausse | Premium Dining Experience",
  description:
    "Experience unique gastronomy at Café Fausse. Sophisticated dishes, cozy atmosphere, and exceptional service. Reserve your table today!",
  keywords:
    "restaurant, gastronomy, cuisine, reservations, dinner, lunch, special dishes, fine dining, café",
  authors: [{ name: "Café Fausse" }],
  openGraph: {
    title: "Café Fausse | Premium Dining Experience",
    description:
      "Experience unique gastronomy at Café Fausse. Sophisticated dishes, cozy atmosphere, and exceptional service.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased font-roboto h-full bg-background text-foreground`}
      >
        <ThemeProvider>
          <ToasterProvider>
            <div className="min-h-full flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <ToasterContainer />
            </div>
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
