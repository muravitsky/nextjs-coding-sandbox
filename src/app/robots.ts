import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nextjs-coding-sandbox.vercel.app/sitemap.xml",
  };
}
