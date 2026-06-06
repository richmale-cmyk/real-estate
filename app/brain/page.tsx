import type { Metadata } from "next";
import Link from "next/link";
import { getAllNotes } from "@/lib/brain";

export const metadata: Metadata = {
  title: "Brain — Richard Male",
  description: "A digital garden of notes on aviation, leadership, AI, and thinking.",
};

const statusIcon: Record<string, string> = {
  seedling: "🌱",
  growing: "🌿",
  evergreen: "🌳",
};

const statusLabel: Record<string, string> = {
  seedling: "Seedling",
  growing: "Growing",
  evergreen: "Evergreen",
};

export default function BrainPage() {
  const notes = getAllNotes();
  const tags = Array.from(new Set(notes.flatMap((n) => n.tags))).sort();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Header */}
      <div className="border-b border-white/5 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-300 transition-colors mb-8 inline-block"
          >
            ← rmale.io
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Brain</h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-lg">
            A digital garden — not a blog. Notes in various states of growth on aviation, leadership, AI, and how I think about things.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-gray-500">
            <span>🌱 Seedling</span>
            <span>🌿 Growing</span>
            <span>🌳 Evergreen</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="border-b border-white/5 py-4">
          <div className="max-w-2xl mx-auto px-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {notes.length === 0 ? (
          <p className="text-gray-500">Nothing planted yet.</p>
        ) : (
          <div className="space-y-px">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/brain/${note.slug}`}
                className="group flex items-start gap-4 py-6 border-b border-white/5 hover:border-white/10 transition-colors"
              >
                <span className="text-lg mt-0.5 flex-shrink-0" title={statusLabel[note.status]}>
                  {statusIcon[note.status] ?? "🌱"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h2 className="font-semibold text-white group-hover:text-gray-100 transition-colors leading-snug">
                      {note.title}
                    </h2>
                    <span className="text-xs text-gray-600 flex-shrink-0">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{note.excerpt}</p>
                  <div className="flex gap-2 mt-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
