import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import SiteTabs from "@/components/SiteTabs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "rmale.io",
    template: "%s | rmale.io",
  },
  description: "Two-page shell for Personal OS and supporting pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-[#050816] font-sans text-white antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(200,169,110,0.16),_transparent_28%),linear-gradient(180deg,_#0a1024_0%,_#050816_100%)]">
          <header className="border-b border-white/10 bg-black/20 backdrop-blur">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">rmale.io</p>
                <h1 className="mt-1 text-xl font-bold text-white md:text-2xl">Personal shell</h1>
              </div>
              <SiteTabs />
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
