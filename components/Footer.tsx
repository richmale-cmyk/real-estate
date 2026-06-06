"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Twitter, Linkedin, Facebook, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  Properties: [
    { href: "/properties?type=House", label: "Houses" },
    { href: "/properties?type=Apartment", label: "Apartments" },
    { href: "/properties?type=Villa", label: "Villas" },
    { href: "/properties?status=New", label: "New Listings" },
    { href: "/properties?status=Sold", label: "Recently Sold" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/about#team", label: "Our Team" },
    { href: "/about#awards", label: "Awards & Press" },
  ],
};

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-extrabold tracking-tight">
                LUX<span className="text-accent">PROP</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              Representing the world&apos;s most exceptional homes across the most desirable addresses. Where extraordinary properties meet extraordinary lives.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-accent transition-colors duration-200"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-5">
              Stay Informed
            </h4>
            <p className="text-sm text-white/65 mb-4">
              Receive curated listings and market insights.
            </p>
            {submitted ? (
              <p className="text-accent text-sm font-medium">
                Thank you — you&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent transition-colors duration-200 min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-accent hover:bg-white hover:text-primary text-white transition-colors duration-200 flex-shrink-0"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>1 Park Avenue, Suite 4200<br />New York, NY 10016</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="flex-shrink-0 text-accent" />
                <span>+1 (212) 555-0100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="flex-shrink-0 text-accent" />
                <span>hello@luxprop.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} LuxProp. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
