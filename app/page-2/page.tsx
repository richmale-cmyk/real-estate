import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page 2",
  description: "Placeholder for tomorrow's HTML file",
};

export default function PageTwo() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-[1600px] px-4 py-4 md:px-8 md:py-6">
      <div className="flex w-full items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Page 2</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Ready for tomorrow’s HTML file</h2>
          <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
            Send me the HTML tomorrow and I’ll drop it straight into this tab.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 px-6 py-5 text-left text-sm text-white/65">
            <p className="font-semibold text-white">Planned behaviour</p>
            <ul className="mt-3 space-y-2">
              <li>• Tab 1 stays as the live Personal OS page.</li>
              <li>• Tab 2 becomes your supplied HTML page.</li>
              <li>• Same rmale.io shell and navigation across both.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
