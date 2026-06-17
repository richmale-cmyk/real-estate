import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal OS",
  description: "Embedded Personal OS dashboard",
};

export default function HomePage() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Page 1</p>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Personal OS</h2>
          <p className="mt-1 text-sm text-white/65 md:text-base">
            Live embed of <span className="text-white">personal-os-silk.vercel.app</span>.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/25 shadow-2xl shadow-black/30">
        <iframe
          src="https://personal-os-silk.vercel.app/"
          title="Personal OS"
          className="h-[calc(100vh-12rem)] min-h-[720px] w-full bg-white"
        />
      </div>
    </section>
  );
}
