import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function manifest(): MetadataRoute.Manifest {
  const { seo } = getPerson();
  return {
    name: seo.titleDefault,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    lang: "tr",
    background_color: "#14211d",
    theme_color: "#0d1713",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
