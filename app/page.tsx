import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal OS",
  description: "Personal OS — Richard Male",
};

export default function HomePage() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-4 md:px-8 md:py-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <iframe
          src="https://personal-os-silk.vercel.app/"
          title="Personal OS"
          className="h-[calc(100vh-5rem)] min-h-[720px] w-full"
        />
      </div>
    </section>
  );
}
