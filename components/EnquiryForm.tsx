"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface EnquiryFormProps {
  propertyTitle?: string;
  compact?: boolean;
}

export default function EnquiryForm({ propertyTitle, compact = false }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, property_title: propertyTitle }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white ${compact ? "p-6" : "p-8 md:p-10"} shadow-sm border border-gray-100`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-8"
          >
            <CheckCircle2 size={48} className="text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Enquiry Received</h3>
            <p className="text-text-muted text-sm mb-6 max-w-xs">
              Thank you for your interest. One of our agents will be in touch within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {!compact && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-1">
                  {propertyTitle ? "Enquire About This Property" : "Get in Touch"}
                </h3>
                {propertyTitle && (
                  <p className="text-sm text-text-muted">{propertyTitle}</p>
                )}
              </div>
            )}

            <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 tracking-wide uppercase">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className="input-field"
                  placeholder="James Hartwell"
                />
                {errors.name && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="input-field"
                  placeholder="james@example.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className={compact ? "" : "md:col-span-2"}>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 tracking-wide uppercase">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="input-field"
                  placeholder="+1 (310) 555-0100"
                />
                {errors.phone && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className={compact ? "" : "md:col-span-2"}>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 tracking-wide uppercase">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={compact ? 3 : 4}
                  className="input-field resize-none"
                  placeholder={
                    propertyTitle
                      ? `I'm interested in ${propertyTitle} and would like to arrange a viewing...`
                      : "How can we help you today?"
                  }
                />
                {errors.message && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3">
                <AlertCircle size={14} className="flex-shrink-0" />
                {serverError}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Enquiry
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
