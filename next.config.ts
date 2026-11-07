import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }, { protocol: "https", hostname: "avatars.githubusercontent.com" }] },
  experimental: { optimizePackageImports: ["lucide-react"] },
  poweredByHeader: false,
  async headers(){return [{source:"/:path*",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"X-Frame-Options",value:"DENY"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},{key:"Strict-Transport-Security",value:"max-age=63072000; includeSubDomains; preload"}]}]},
  compress: true
};
export default nextConfig;
