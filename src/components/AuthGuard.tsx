"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

/**
 * 보호된 페이지 래퍼: 비로그인 시 /login으로 리다이렉트
 * Hydration 깜빡임 방지를 위해 마운트 후에만 체크
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/login");
    }
  }, [mounted, isLoggedIn, router]);

  // 마운트 전 또는 로그인 안 된 상태에서는 빈 화면
  if (!mounted || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <div className="text-[#CC0000] text-2xl font-black mb-2">G1 Networks</div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
