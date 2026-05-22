import type { Metadata } from "next";
import "@/index.css";
import "@/App.css";
import { siteConfig } from "@/constants/site";

const SITE_URL = siteConfig.url;
const TITLE =
  "Frontend Developer Portfolio | Rushi Chudasama — React.js, Next.js & TypeScript Engineer";
const DESCRIPTION =
  "Hire Rushi Chudasama — Frontend Developer with 4+ years building production React.js, Next.js, and TypeScript apps. AI-native engineer based in Ahmedabad, India, available for freelance and full-time roles. Specializing in Framer Motion, Tailwind CSS, and modern web performance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Rushi Chudasama",
  },
  description: DESCRIPTION,
  applicationName: "Rushi Chudasama Portfolio",
  authors: [{ name: "Rushi Chudasama", url: SITE_URL }],
  creator: "Rushi Chudasama",
  publisher: "Rushi Chudasama",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Rushi Chudasama — Frontend Developer Portfolio",
    locale: "en_US",
    type: "profile",
    firstName: "Rushi",
    lastName: "Chudasama",
    username: "rushi-45",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: siteConfig.twitterHandle,
  },
  verification: {
    // Add your Google Search Console verification token here after registering:
    // google: "abc123-verification-token-here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={SITE_URL} />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://formsubmit.co" />
        <link
          rel="preload"
          as="image"
          href="/spinner-320w.webp"
          fetchPriority="high"
          imageSrcSet="/spinner-320w.webp 320w, /spinner-480w.webp 480w, /spinner-560w.webp 560w, /spinner-600w.webp 600w"
          imageSizes="(max-width: 575px) 320px, (max-width: 768px) 480px, (max-width: 992px) 560px, 600px"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: siteConfig.name,
              alternateName: ["Rushi", "Rushi Patel"],
              url: SITE_URL,
              image: `${SITE_URL}/opengraph-image.png`,
              jobTitle: siteConfig.jobTitle,
              description:
                "Frontend Developer with 4+ years of experience building React.js, Next.js, and TypeScript applications. AI-native engineer based in Ahmedabad, India.",
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.location.city,
                addressRegion: siteConfig.location.region,
                addressCountry: siteConfig.location.country,
              },
              email: `mailto:${siteConfig.email}`,
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Framer Motion",
                "Redux",
                "Node.js",
                "HTML5",
                "CSS3",
                "Frontend Development",
                "Web Performance",
                "Responsive Design",
                "Accessibility",
                "AI-Augmented Development",
                "Cursor IDE",
                "Claude Code",
                "GitHub Copilot",
              ],
              sameAs: [
                siteConfig.social.linkedin,
                siteConfig.social.github,
                siteConfig.social.instagram,
              ],
              worksFor: {
                "@type": "Organization",
                name: "Bacancy Technologies",
                url: "https://www.bacancytechnology.com/",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Rushi Chudasama — Frontend Developer Portfolio",
              description: DESCRIPTION,
              inLanguage: "en-US",
              publisher: { "@id": `${SITE_URL}/#person` },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
