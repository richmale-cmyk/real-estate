import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/brain";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNoteBySlug(params.slug);
  if (!note) return {};
  return { title: `${note.title} — Brain`, description: note.excerpt };
}

const statusIcon: Record<string, string> = {
  seedling: "🌱",
  growing: "🌿",
  evergreen: "🌳",
};

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-10 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[#C8A96E]/60 pl-4 text-slate-300/80 italic my-6">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-300 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-5 text-[1.0625rem] text-slate-300 leading-[1.75]">')
    .replace(/^/, '<p class="mb-5 text-[1.0625rem] text-slate-300 leading-[1.75]">')
    .replace(/$/, '</p>');
}

export default function NotePage({ params }: Props) {
  const note = getNoteBySlug(params.slug);
  if (!note) notFound();

  return (
    <div className="min-h-screen bg-[#0B1A33] text-slate-200">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Nav */}
        <Link
          href="/brain"
          className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-300 transition-colors mb-12 inline-block"
        >
          ← Brain
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg" title={note.status}>{statusIcon[note.status] ?? "🌱"}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{note.status}</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">{note.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-6 tracking-tight">
          {note.title}
        </h1>

        {/* Tags */}
        <div className="flex gap-2 mb-12 pb-12 border-b border-[#C8A96E]/15">
          {note.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#C8A96E]/70">
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose-brain"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
        />

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <Link
            href="/brain"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back to all notes
          </Link>
        </div>
      </div>
    </div>
  );
}
