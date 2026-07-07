"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { courses } from "@/data/students";

export default function Programmes() {
  return (
    <section id="programmes" className="relative z-10 border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Programmes</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Accredited pathways for ambitious professionals
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass group rounded-2xl p-6 transition-shadow hover:shadow-cyan/5"
            >
              {c.tag && (
                <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {c.tag}
                </span>
              )}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-snow">{c.title}</h3>
              <p className="mt-1 text-sm text-mist">{c.level}</p>
              <div className="mt-6 flex items-end justify-between border-t border-white/5 pt-5">
                <div>
                  <div className="font-mono text-2xl font-bold text-snow">£{c.from.toLocaleString()}</div>
                  <div className="text-xs text-mist">from · enquiry only</div>
                </div>
                <span className="flex items-center gap-1 text-sm text-cyan opacity-0 transition group-hover:opacity-100">
                  Details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
