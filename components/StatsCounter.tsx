"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 847, suffix: "+", label: "Properties Sold" },
  { value: 16, suffix: "", label: "Years of Excellence" },
  { value: 24, suffix: "", label: "Cities Covered" },
  { value: 2.4, suffix: "B+", label: "Transaction Value", prefix: "$" },
];

function useCountUp(target: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!isActive) return;
    const steps = 60;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(parseFloat(current.toFixed(isDecimal ? 1 : 0)));
      if (current >= target) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive, target, duration, isDecimal]);

  return count;
}

function StatItem({ stat, isActive, index }: { stat: Stat; isActive: boolean; index: number }) {
  const count = useCountUp(stat.value, 1.8, isActive);
  const isDecimal = stat.value % 1 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-5xl xl:text-6xl font-extrabold text-primary tracking-tight mb-2">
        {stat.prefix}
        {isDecimal ? count.toFixed(1) : count}
        {stat.suffix}
      </div>
      <div className="text-sm font-semibold tracking-wide text-text-muted uppercase">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-bg-subtle" ref={ref}>
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isActive={isActive} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
