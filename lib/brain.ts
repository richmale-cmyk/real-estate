import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BRAIN_DIR = path.join(process.cwd(), "content/brain");

export interface Note {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  status: "seedling" | "growing" | "evergreen";
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(BRAIN_DIR)) return [];
  const files = fs.readdirSync(BRAIN_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(BRAIN_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? content.slice(0, 160).replace(/\n/g, " ") + "…",
        content,
        status: data.status ?? "seedling",
      } as Note;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): Note | null {
  const filePath = path.join(BRAIN_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? content.slice(0, 160).replace(/\n/g, " ") + "…",
    content,
    status: data.status ?? "seedling",
  };
}
