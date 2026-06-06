import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LuxProp — Exceptional Properties, Exceptional Lives",
    template: "%s | LuxProp",
  },
  description:
    "LuxProp represents the finest residential properties across the most desirable addresses in the world. Where exceptional homes meet extraordinary lives.",
  keywords: ["luxury real estate", "property", "homes for sale", "premium listings"],
  openGraph: {
    title: "LuxProp — Exceptional Properties, Exceptional Lives",
    description:
      "LuxProp represents the finest residential properties across the most desirable addresses in the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-surface text-text-dark antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
