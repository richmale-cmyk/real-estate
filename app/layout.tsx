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
  description: "Personal OS — Richard Male",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-white font-sans text-text-dark antialiased">
        <header className="border-b border-gray-100 bg-white shadow-sm">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">rmale.io</p>
                <h1 className="text-lg font-bold text-text-dark md:text-xl">Personal OS</h1>
              </div>
            </div>
            <SiteTabs />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
