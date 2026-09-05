/**
 * Central brand + contact configuration.
 * Replace these placeholder details with the studio's real handles.
 */
export const BRAND = {
  name: "Cineshotss",
  tagline: "Stories of Love, Captured Forever",
  statement: "A luxury wedding photography & cinematography studio",
  email: "hello@cineshotss.com",
  instagramHandle: "@cineshotss",
  instagramUrl: "https://instagram.com/cineshotss",
  // Digits only, international format, no "+" or spaces.
  whatsappNumber: "910000000000",
  whatsappDisplay: "+91 00000 00000",
} as const;

export const whatsappUrl = (message = "Hi Cineshotss, I'd love to know more about your wedding coverage.") =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject = "Wedding enquiry") =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

export const whatsappUrlFor = (number: string, message = "Hi Cineshotss, I'd love to know more about your wedding coverage.") =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const mailtoUrlFor = (email: string, subject = "Wedding enquiry") =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;
