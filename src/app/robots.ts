import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/example-us/","/example-us/"]
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}
