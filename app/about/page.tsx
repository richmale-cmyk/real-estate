import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, TrendingUp, Users, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About LuxProp",
  description:
    "Since 2008, LuxProp has represented the world's finest residential properties. Meet our award-winning team.",
};

const teamMembers = [
  {
    name: "James Hartwell",
    role: "Founder & Managing Partner",
    bio: "With over 20 years in luxury real estate, James has guided clients through $1.2B+ in transactions across the US.",
    image: "https://picsum.photos/seed/team001/600/700",
  },
  {
    name: "Sophia Beaumont",
    role: "Head of Sales — East Coast",
    bio: "Sophia's deep knowledge of the Manhattan and Hamptons markets has made her one of the city's most trusted advisors.",
    image: "https://picsum.photos/seed/team002/600/700",
  },
  {
    name: "Marcus Chen",
    role: "Head of Sales — West Coast",
    bio: "Marcus brings an architect's eye and a financier's precision to every transaction from Malibu to Napa Valley.",
    image: "https://picsum.photos/seed/team003/600/700",
  },
  {
    name: "Isabelle Fontaine",
    role: "Director of Client Relations",
    bio: "Isabelle ensures that every client relationship is handled with the personalised care that defines the LuxProp standard.",
    image: "https://picsum.photos/seed/team004/600/700",
  },
];

const values = [
  {
    icon: Users,
    title: "Client First",
    description:
      "Every decision we make starts with our client's interests. We act as trusted advisors, not just transaction facilitators.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "We represent only the finest properties and bring the same standards to our service as our listings embody.",
  },
  {
    icon: TrendingUp,
    title: "Market Mastery",
    description:
      "Our agents carry deep, data-informed expertise in the markets they serve — insight you cannot find elsewhere.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Through our international network, we connect buyers and sellers across the world's most coveted addresses.",
  },
];

const pressLogos = [
  "Wall Street Journal",
  "The New York Times",
  "Architectural Digest",
  "Forbes",
  "Financial Times",
  "Vogue",
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/about001/1600/900"
            alt="LuxProp headquarters"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative container-wide pb-20 pt-48">
          <span className="section-label text-accent mb-4 block">About LuxProp</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-3xl">
            Built on Trust.<br />
            <span className="text-accent">Driven by Results.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="section-label mb-4 block">Our Story</span>
            <h2 className="text-4xl font-extrabold text-text-dark mb-6 leading-tight">
              Sixteen Years of<br />
              <span className="text-primary">Extraordinary Outcomes</span>
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                LuxProp was founded in 2008 on a simple conviction: that the most significant property transactions deserved a fundamentally different kind of representation. Not a transactional approach, but a deeply consultative one — where understanding a client&apos;s life aspirations came before ever discussing square footage or price.
              </p>
              <p>
                From a single office in New York, we have grown into a firm that represents hundreds of exceptional properties annually across five markets. Every step of that growth has been guided by the same principle our founder established at the beginning: the right home, the right way.
              </p>
              <p>
                Today, LuxProp is consistently recognised as one of the most trusted names in luxury residential real estate, with an unbroken record of client satisfaction and repeat engagements that speaks for itself.
              </p>
            </div>
            <Link href="/contact" className="btn-primary mt-8 group">
              Work With Us
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative">
            <div className="relative h-[480px] lg:h-[580px]">
              <Image
                src="https://picsum.photos/seed/about002/800/900"
                alt="LuxProp team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBAAAQQBBQEAAAAAAAAAAAAAAQIDBAUREiExQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCi3ue5VnXfHWmkpQ2hzpSEpAAAHQBIAHwBSlAz/9k="
              />
            </div>
            {/* Accent bar */}
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent/10 -z-10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-bg-subtle">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark">
              Our <span className="text-primary">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white p-8 border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors duration-300">
                    <Icon size={22} className="text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-bold text-text-dark mb-3">{value.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="container-wide">
          <div className="mb-14">
            <span className="section-label mb-3 block">The People Behind the Work</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark">
              Meet Our <span className="text-primary">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="group">
                <div className="relative h-80 overflow-hidden mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-text-dark">{member.name}</h3>
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{member.role}</p>
                <p className="text-sm text-text-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards / Press */}
      <section id="awards" className="py-16 bg-primary">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="section-label text-accent mb-3 block">Recognition</span>
            <h2 className="text-3xl font-extrabold text-white">
              As Featured In
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {pressLogos.map((logo) => (
              <div key={logo} className="text-white/30 hover:text-white/80 transition-colors duration-300 cursor-default">
                <span className="text-sm font-bold tracking-[0.12em] uppercase">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-subtle">
        <div className="container-narrow text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-5 text-balance">
            Ready to Work With <span className="text-primary">Us?</span>
          </h2>
          <p className="text-text-muted mb-8 text-base max-w-xl mx-auto">
            Whether you&apos;re buying, selling, or simply exploring, our team is ready to listen and deliver.
          </p>
          <Link href="/contact" className="btn-primary group">
            Get in Touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
