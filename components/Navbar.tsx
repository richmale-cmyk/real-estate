"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navBg = isHomePage
    ? scrolled
      ? "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]"
      : "bg-transparent"
    : "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]";

  const linkColor = isHomePage && !scrolled ? "text-white" : "text-text-dark";
  const logoColor = isHomePage && !scrolled ? "text-white" : "text-primary";
  const logoDotColor = isHomePage && !scrolled ? "text-accent" : "text-accent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="container-wide flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${logoColor}`}>
              LUX
            </span>
            <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${logoDotColor}`}>
              PROP
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group ${linkColor} ${
                    active ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className={`text-sm font-semibold px-6 py-2.5 border-2 transition-all duration-300 ${
                isHomePage && !scrolled
                  ? "border-white text-white hover:bg-white hover:text-primary"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${linkColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-primary">LUX</span>
                  <span className="text-accent">PROP</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-muted hover:text-text-dark"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col p-6 gap-2">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 text-lg font-semibold transition-colors duration-200 ${
                          active
                            ? "text-primary bg-bg-subtle"
                            : "text-text-dark hover:text-primary hover:bg-bg-subtle"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-gray-100">
                <Link href="/contact" className="btn-primary w-full text-center">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
