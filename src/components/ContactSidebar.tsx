import { useState } from "react";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/msbt";

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    bg: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.253h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: `https://wa.me/${site.whatsapp.replace(/\D/g, "") || ""}`,
    label: "WhatsApp",
    bg: "bg-[#25D366]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const contactRows = [
  {
    key: "address",
    label: "Google address",
    icon: MapPin,
    iconWrap: "bg-gradient-to-br from-[#EA4335] to-[#FBBC05] text-white shadow-orange/30",
    body: (
      <>
        <p className="text-base font-bold leading-relaxed text-ink sm:text-lg">{site.address}</p>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-[#3367D6]"
        >
          Open in Google Maps
          <ExternalLink size={15} aria-hidden />
        </a>
      </>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    icon: Phone,
    iconWrap: "bg-gradient-to-br from-teal to-sky text-white shadow-teal/30",
    body: (
      <a
        href={`tel:${site.phone.replace(/\s/g, "")}`}
        className="block text-base font-bold text-navy underline-offset-2 hover:underline sm:text-lg"
      >
        {site.phone}
      </a>
    ),
  },
  {
    key: "email",
    label: "Email",
    icon: Mail,
    iconWrap: "bg-gradient-to-br from-navy to-[#2a4a7a] text-gold shadow-navy/30",
    body: (
      <a
        href={`mailto:${site.email}`}
        className="block break-all text-base font-bold text-navy underline-offset-2 hover:underline sm:text-lg"
      >
        {site.email}
      </a>
    ),
  },
  {
    key: "hours",
    label: "Support hours",
    icon: Clock,
    iconWrap: "bg-gradient-to-br from-orange to-peach-deep text-white shadow-orange/30",
    body: (
      <p className="text-base font-bold text-ink sm:text-lg">Monday – Friday, 9:00 – 17:00 (UK)</p>
    ),
  },
] as const;

const mapQuery = encodeURIComponent(site.address);
const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&hl=en&z=15&output=embed`;

export default function ContactSidebar() {
  const [showMap, setShowMap] = useState(false);

  return (
    <aside className="space-y-6" aria-label="Contact information">
      <div className="overflow-hidden rounded-3xl border-2 border-navy/10 bg-white card-shadow ring-2 ring-navy/5">
        <div className="border-b border-line bg-gradient-to-r from-navy/10 via-gold/10 to-orange/10 px-6 py-5">
          <h2 className="font-display text-2xl font-bold text-navy">Visit &amp; connect</h2>
          <p className="mt-1 text-sm font-semibold text-muted">
            Find us on Google Maps or reach admissions directly.
          </p>
        </div>

        <ul className="divide-y divide-line/80 p-2 sm:p-3">
          {contactRows.map((row) => {
            const Icon = row.icon;
            return (
              <li key={row.key} className="flex items-start gap-4 px-4 py-5 sm:px-5">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg ${row.iconWrap}`}
                  aria-hidden
                >
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{row.label}</p>
                  <div className="mt-1.5">{row.body}</div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-line px-6 py-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Follow us</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full ${social.bg} shadow-md transition hover:scale-105 hover:brightness-110`}
                aria-label={`${social.label} (opens in new tab)`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-navy/10 bg-white card-shadow ring-2 ring-navy/5">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-[#F8FAFF] px-5 py-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#4285F4]">Google Maps</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{site.address}</p>
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-bold text-[#4285F4] underline-offset-2 hover:underline"
          >
            Directions
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full bg-navy/5 sm:aspect-video lg:aspect-[4/3]">
          {showMap ? (
            <iframe
              title={`Google Map showing ${site.name} at ${site.address}`}
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,#e8f0fe_0%,#fff_45%,#fef7e0_100%)] px-6 text-center transition hover:brightness-[0.98]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-lg">
                <MapPin size={28} aria-hidden />
              </span>
              <span className="text-lg font-bold text-navy">Show Google Map</span>
              <span className="max-w-xs text-sm font-medium text-muted">
                Loads the map when you need it — faster page on mobile.
              </span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
