import type { Metadata, Viewport } from "next";
import { Rozha_One, Noto_Serif_Devanagari, Cormorant_Garamond } from "next/font/google";
import { photography, wedding } from "@/data/wedding";
import "./globals.css";

const rozhaDisplay = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const devanagariSans = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const royalNumerals = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-numerals",
  display: "swap",
});

function resolveSiteUrl(...candidates: Array<string | undefined>): URL {
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol);
    } catch {
      // Continue to next candidate
    }
  }

  return new URL("http://localhost:3000");
}

const siteUrl = resolveSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "चि. ओंकार आणि चि. सौ. कां. समृद्धी | शुभ विवाह सोहळा २१ नोव्हेंबर २०२६",
  description:
    "॥ सस्नेह निमंत्रण ॥ चि. ओंकार आणि चि. सौ. कां. समृद्धी यांचा शुभ विवाह सोहळा शनिवार, २१ नोव्हेंबर २०२६ रोजी पुणे येथे संपन्न होत आहे. सहकुटुंब सहपरिवार उपस्थित राहून शुभाशीर्वाद द्यावेत ही नम्र विनंती.",
  applicationName: "ओंकार आणि समृद्धी विवाह पत्रिका",
  openGraph: {
    title: "॥ शुभमंगल सावधान ॥ ओंकार आणि समृद्धी विवाह सोहळा",
    description: "२१ नोव्हेंबर २०२६, पुणे, महाराष्ट्र",
    type: "website",
    url: siteUrl.href,
    images: [{ url: photography.hero, width: 1200, height: 630, alt: "ओंकार व समृद्धी विवाह निमंत्रण" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ओंकार आणि समृद्धी विवाह सोहळा",
    description: "२१ नोव्हेंबर २०२६, पुणे, महाराष्ट्र",
  },
  appleWebApp: {
    capable: true,
    title: "ओंकार & समृद्धी विवाह",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4f0d23",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mr" className={`${rozhaDisplay.variable} ${devanagariSans.variable} ${royalNumerals.variable}`}>
      <body>{children}</body>
    </html>
  );
}
