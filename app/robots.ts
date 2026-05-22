import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export const dynamic = "force-static";

const SITE_URL = siteConfig.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
