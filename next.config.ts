import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lucide-react는 기본 최적화 목록에 포함되어 있으나 명시적으로 지정
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // 기본 보안 헤더 (CSP는 백엔드 도입 시 추가)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // 영상은 캐시 적극 활용
        source: "/hero-loop.:ext(mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
