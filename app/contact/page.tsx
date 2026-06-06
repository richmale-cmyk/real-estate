import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak to a LuxProp agent about buying, selling, or investing in exceptional real estate. We're here to help.",
};

const offices = [
  {
    city: "New York",
    address: "1 Park Avenue, Suite 4200",
    locality: "New York, NY 10016",
    phone: "+1 (212) 555-0100",
    email: "nyc@luxprop.com",
  },
  {
    city: "Los Angeles",
    address: "9100 Wilshire Boulevard, Suite 600W",
    locality: "Beverly Hills, CA 90212",
    phone: "+1 (310) 555-0140",
    email: "la@luxprop.com",
  },
  {
    city: "Miami",
    address: "701 Brickell Avenue, Suite 1550",
    locality: "Miami, FL 33131",
    phone: "+1 (305) 555-0170",
    email: "miami@luxprop.com",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-primary pt-40 pb-16">
        <div className="container-wide">
          <span className="section-label text-accent mb-3 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact Our Team
          </h1>
          <p className="text-white/60 text-base max-w-xl">
            Whether you have a specific property in mind or are just beginning your search, we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Main split layout */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — form */}
          <div>
            <h2 className="text-2xl font-extrabold text-text-dark mb-2">Send Us a Message</h2>
            <p className="text-text-muted text-sm mb-8">
              Complete the form and one of our agents will respond within 24 hours.
            </p>
            <EnquiryForm />
          </div>

          {/* Right — office info */}
          <div>
            <h2 className="text-2xl font-extrabold text-text-dark mb-2">Our Offices</h2>
            <p className="text-text-muted text-sm mb-8">
              Visit us in person at any of our locations.
            </p>

            <div className="space-y-6">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="p-6 border border-gray-100 hover:border-accent/30 hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="text-base font-bold text-primary mb-3">{office.city}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm text-text-muted">
                      <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p>{office.address}</p>
                        <p>{office.locality}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <Phone size={14} className="text-accent flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <Mail size={14} className="text-accent flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="mt-6 p-6 bg-bg-subtle">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-accent" />
                <h3 className="text-sm font-bold text-text-dark">Business Hours</h3>
              </div>
              <div className="space-y-1 text-sm text-text-muted">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-text-muted/60">By appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 md:h-96 relative bg-bg-subtle overflow-hidden">
        <Image
          src="https://picsum.photos/seed/mapcontact/1600/500"
          alt="Office locations map"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white shadow-xl px-10 py-6 text-center">
            <MapPin size={24} className="text-accent mx-auto mb-2" />
            <p className="text-base font-bold text-primary">New York · Los Angeles · Miami</p>
            <p className="text-xs text-text-muted mt-1">Three offices, one standard of excellence</p>
          </div>
        </div>
      </section>
    </>
  );
}
