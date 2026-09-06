import { supabase } from "@/integrations/supabase/client";
import { validateGalleryFile } from "@/lib/gallery";
import type { Json } from "@/integrations/supabase/types";

export const SITE_CONTENT_ID = "main";
export const SITE_CONTENT_BUCKET = "gallery";

export interface HomeSectionContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  notes: string[];
  cta: string;
  leadImagePath: string | null;
  supportImagePath: string | null;
}

export interface LegalSectionContent {
  heading: string;
  body: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    statement: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    whatsappNumber: string;
    whatsappDisplay: string;
  };
  navigation: Record<string, string>;
  home: {
    hero: { title: string; tagline: string; imagePath: string | null };
    about: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
      cta: string;
      imagePath: string | null;
    };
    sections: Record<string, HomeSectionContent>;
    cta: { heading: string; eyebrow: string; imagePath: string | null };
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    services: { term: string; detail: string }[];
    cta: string;
    imagePath: string | null;
  };
  galleries: Record<string, { label: string; description: string }>;
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    whatsappLabel: string;
    emailLabel: string;
    instagramLabel: string;
    whatsappCta: string;
    instagramCta: string;
    imagePath: string | null;
  };
  legal: {
    privacy: { eyebrow: string; title: string; sections: LegalSectionContent[] };
    terms: { eyebrow: string; title: string; sections: LegalSectionContent[] };
  };
}

const section = (
  eyebrow: string,
  heading: string,
  paragraphs: string[],
  notes: string[],
  cta: string,
): HomeSectionContent => ({
  eyebrow,
  heading,
  paragraphs,
  notes,
  cta,
  leadImagePath: null,
  supportImagePath: null,
});

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    name: "Cineshotss",
    tagline: "Stories of Love, Captured Forever",
    statement: "A luxury wedding photography & cinematography studio",
    email: "hello@cineshotss.com",
    instagramHandle: "@cineshotss",
    instagramUrl: "https://instagram.com/cineshotss",
    whatsappNumber: "910000000000",
    whatsappDisplay: "+91 00000 00000",
  },
  navigation: {
    wedding: "Wedding",
    preWedding: "Pre-Wedding",
    engagement: "Engagement",
    haldi: "Haldi",
    about: "About",
    contact: "Contact",
    galleries: "Galleries",
    connect: "Connect",
    privacy: "Privacy Policy",
    terms: "Terms & Support",
  },
  home: {
    hero: { title: "Cineshotss", tagline: "Stories of Love, Captured Forever", imagePath: null },
    about: {
      eyebrow: "About Cineshotss",
      heading: "About Cineshotss",
      paragraphs: [
        "We photograph and film weddings the way they are actually lived — in glances, in laughter, in the pause before a ritual begins. Nothing staged for the sake of a photograph, everything shaped by the emotion already in the room.",
        "Our work moves between the intimate and the cinematic: the tremble of hands during a ceremony, the scale of a celebration at dusk, the details you spent months choosing. Photographs and films made to be revisited for decades.",
      ],
      cta: "Get in Touch",
      imagePath: null,
    },
    sections: {
      wedding: section("Signature Coverage", "Wedding", [
        "A full wedding day told as one story — the rituals, the portraits and every candid moment that happens between them.",
        "We stay close to the emotion: parents watching, siblings laughing, the couple stealing a private second in the middle of a crowded room. Then we photograph the details you planned so carefully, so the day is remembered completely.",
      ], ["Candid moments", "Emotions", "Couple portraits", "Family celebrations", "Rituals", "Details"], "View Wedding Gallery"),
      "pre-wedding": section("Before the Day", "Pre-Wedding", [
        "A romantic, unhurried session built entirely around your chemistry — no rigid poses, no forced smiles.",
        "We choose locations for their light and mood, then let you simply be together. Cinematic portraits, natural moments and the kind of easy warmth that only appears when nobody is performing.",
      ], ["Genuine chemistry", "Beautiful locations", "Cinematic portraits", "Natural moments"], "View Pre-Wedding Gallery"),
      engagement: section("The First Celebration", "Engagement", [
        "The evening it becomes official — rings, applause and a room full of people who have been waiting for this.",
        "We photograph the intimacy and the excitement side by side: elegant portraits of the two of you, and the candid celebration unfolding around you.",
      ], ["Celebration", "Intimacy", "Excitement", "Elegant portraits", "Candid moments"], "View Engagement Gallery"),
      haldi: section("Tradition & Colour", "Haldi Ceremony", [
        "The warmest, loudest, most joyful morning of the celebration — turmeric everywhere, marigolds underfoot, nobody staying clean.",
        "We photograph haldi for what it truly is: family in the middle of the ritual, laughter that cannot be posed, colour and light at their most alive.",
      ], ["Vibrant colours", "Laughter", "Family", "Traditions", "Candid moments", "Joyful celebration"], "View Haldi Gallery"),
    },
    cta: { heading: "Let us capture your story…", eyebrow: "Cineshotss", imagePath: null },
  },
  about: {
    eyebrow: "About",
    heading: "About Cineshotss",
    paragraphs: [
      "Cineshotss is a wedding photography and cinematography studio built around a simple belief: the moments worth keeping are rarely the posed ones. We photograph the glance before the vows, the grandmother who cannot stop crying, the cousins dancing before the music has properly started.",
      "Our approach is unobtrusive and editorial. We work quietly through the day — following light, ritual and emotion — then shape what we gather into photographs and films that feel like memory rather than documentation.",
      "From intimate ceremonies to multi-day celebrations, every collection is treated as one continuous story: the details, the portraits, the traditions and the celebration that surrounds them.",
    ],
    services: [
      { term: "Photography", detail: "Wedding, pre-wedding, engagement and haldi coverage." },
      { term: "Cinematography", detail: "Wedding films cut for emotion, not checklists." },
      { term: "Direction", detail: "Gentle guidance so portraits still feel like you." },
      { term: "Delivery", detail: "Carefully curated, colour-graded galleries and films." },
    ],
    cta: "Get in Touch",
    imagePath: null,
  },
  galleries: {
    wedding: { label: "Wedding", description: "Rituals, portraits and the quiet moments in between — photographed as one continuous story." },
    "pre-wedding": { label: "Pre-Wedding", description: "An unhurried shoot built around your chemistry, in locations chosen for cinematic light." },
    engagement: { label: "Engagement", description: "The first celebration: rings, applause and the people who love you most." },
    haldi: { label: "Haldi", description: "Turmeric, marigolds and laughter — the warmest morning of the celebration." },
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's talk about your dates",
    description: "Tell us where you're celebrating, the dates you're holding and what matters most to you. We'll reply with availability, coverage options and a selection of recent work.",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    whatsappCta: "Connect on WhatsApp",
    instagramCta: "Follow Us",
    imagePath: null,
  },
  legal: {
    privacy: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      sections: [
        { heading: "Information we collect", body: "When you contact Cineshotss we receive the details you choose to share — such as your name, contact details, event dates and location — so we can respond to your enquiry." },
        { heading: "How we use it", body: "Your details are used only to reply to your enquiry, plan coverage and deliver your photographs and films. We do not sell or rent personal information." },
        { heading: "Photographs", body: "Photographs and films from your celebration are shared publicly only with your permission. If you would prefer your images stay private, tell us and we will keep them out of our portfolio and social channels." },
        { heading: "Contact", body: "For any privacy request, including removal of your images, write to our studio email." },
      ],
    },
    terms: {
      eyebrow: "Legal",
      title: "Terms & Support",
      sections: [
        { heading: "Bookings", body: "Dates are confirmed once coverage, deliverables and timelines have been agreed in writing. Specific terms are shared with each proposal." },
        { heading: "Coverage & delivery", body: "Coverage hours, team size and delivery timelines are set out in your agreement. All photographs and films are curated and colour graded before delivery." },
        { heading: "Usage & copyright", body: "Cineshotss retains copyright of the images and films created, and you receive full personal usage rights. Portfolio use is always discussed with you first." },
        { heading: "Support", body: "For any question about an ongoing or completed project, reach us on WhatsApp or at our studio email." },
      ],
    },
  },
};

function mergeContent(base: SiteContent, incoming: unknown): SiteContent {
  if (!incoming || typeof incoming !== "object") return base;
  const value = incoming as Record<string, unknown>;
  const result = { ...base } as SiteContent;
  for (const key of Object.keys(base) as (keyof SiteContent)[]) {
    const next = value[key];
    if (next === undefined) continue;
    if (Array.isArray(next) || typeof next !== "object" || next === null) {
      (result as unknown as Record<string, unknown>)[key] = next;
      continue;
    }
    const current = base[key];
    if (current && typeof current === "object" && !Array.isArray(current)) {
      (result as unknown as Record<string, unknown>)[key] = mergeRecord(current as Record<string, unknown>, next as Record<string, unknown>);
    }
  }
  return result;
}

function mergeRecord(base: Record<string, unknown>, incoming: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const [key, value] of Object.entries(incoming)) {
    if (value && typeof value === "object" && !Array.isArray(value) && result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
      result[key] = mergeRecord(result[key] as Record<string, unknown>, value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function normalizeSiteContent(value: unknown): SiteContent {
  return mergeContent(DEFAULT_SITE_CONTENT, value);
}

export interface SiteContentResult {
  content: SiteContent;
  media: Record<string, string>;
}

function collectMediaPaths(value: unknown, result: string[] = []): string[] {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectMediaPaths(entry, result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => {
      if (key.toLowerCase().endsWith("imagepath") && typeof entry === "string" && entry) result.push(entry);
      else collectMediaPaths(entry, result);
    });
  }
  return result;
}

export async function resolveSiteContentMedia(content: SiteContent): Promise<SiteContentResult> {
  const paths = [...new Set(collectMediaPaths(content))];
  if (paths.length === 0) return { content, media: {} };
  const { data, error } = await supabase.storage.from(SITE_CONTENT_BUCKET).createSignedUrls(paths, 60 * 60);
  if (error) throw error;
  const media: Record<string, string> = {};
  data?.forEach((entry, index) => {
    const path = paths[index];
    if (path && entry.signedUrl) media[path] = entry.signedUrl;
  });
  return { content, media };
}

export async function fetchPublishedSiteContent(): Promise<SiteContentResult> {
  try {
    const { data, error } = await supabase.from("site_content").select("published_content").eq("id", SITE_CONTENT_ID).maybeSingle();
    if (error) throw error;
    return resolveSiteContentMedia(normalizeSiteContent(data?.published_content));
  } catch {
    return { content: DEFAULT_SITE_CONTENT, media: {} };
  }
}

export async function fetchSiteContentForAdmin() {
  const { data, error } = await supabase.from("site_content").select("draft_content,published_content,published_at,updated_at").eq("id", SITE_CONTENT_ID).single();
  if (error) throw error;
  return {
    draft: normalizeSiteContent(data.draft_content),
    published: normalizeSiteContent(data.published_content),
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
  };
}

export async function saveSiteContentDraft(content: SiteContent) {
  const { error } = await supabase.from("site_content").update({ draft_content: content as unknown as Json }).eq("id", SITE_CONTENT_ID);
  if (error) throw error;
}

export async function publishSiteContent(content: SiteContent) {
  const { error } = await supabase.from("site_content").update({ draft_content: content as unknown as Json, published_content: content as unknown as Json, published_at: new Date().toISOString() }).eq("id", SITE_CONTENT_ID);
  if (error) throw error;
}

export async function uploadSiteContentImage(file: File, field: string) {
  const validationError = validateGalleryFile(file);
  if (validationError) throw new Error(validationError);
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `site-content/${field}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(SITE_CONTENT_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  return path;
}

export function mediaUrl(result: SiteContentResult | null, path: string | null, fallback: string) {
  return path && result?.media[path] ? result.media[path] : fallback;
}