import type { MetadataRoute } from "next";

/** Home-screen name and icons for phones. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ériu Sports",
    short_name: "Ériu Sports",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0A7A44",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
