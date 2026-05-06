"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 이미 로그인 상태면 바로 샵으로
  useEffect(() => {
    if (isLoggedIn) router.replace("/products");
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(id, password);
    setLoading(false);
    if (result.success) {
      router.push("/products");
    } else {
      setError(result.message || "로그인에 실패했습니다.");
    }
  };

  const quickLogin = async (testId: string) => {
    setId(testId);
    setPassword("1234");
    setError("");
    setLoading(true);
    const result = await login(testId, "1234");
    setLoading(false);
    if (result.success) router.push("/products");
    else setError(result.message || "로그인 실패");
  };

  return (
    <>
      <main className="flex-1 flex items-center justify-center px-6 py-20" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[420px]">
          <Link href="/" className="block">
            <h1 className="text-[28px] font-black text-center mb-2" style={{ color: "var(--text)" }}>
              G1 <span className="text-[#CC0000]">Networks</span>
            </h1>
          </Link>
          <p className="text-center text-sm mb-8" style={{ color: "var(--text-muted)" }}>수입차 부품 공식 판매점</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>
                아이디 (사업자등록번호 또는 일반 ID)
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#CC0000]"
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#CC0000]"
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
              />
            </div>

            {error && (
              <div className="rounded-lg px-4 py-3 text-[13px]" style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", color: "#ff5555" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CC0000] text-white text-center font-bold py-3.5 rounded-xl mt-2 hover:bg-[#e00] transition-all disabled:opacity-50"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* 데모용 빠른 로그인 */}
          <div className="mt-6 rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="text-[11px] font-bold mb-3 tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              🎮 데모 빠른 로그인
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickLogin("wholesale")}
                className="rounded-lg py-2.5 text-[13px] font-bold transition-all"
                style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", color: "#ff5555" }}
              >
                도매 계정 진입
              </button>
              <button
                type="button"
                onClick={() => quickLogin("retail")}
                className="rounded-lg py-2.5 text-[13px] font-bold transition-all"
                style={{ background: "rgba(3,199,90,0.1)", border: "1px solid rgba(3,199,90,0.3)", color: "#03C75A" }}
              >
                소매 계정 진입
              </button>
            </div>
            <p className="text-[10px] mt-2" style={{ color: "var(--text-dim)" }}>
              ID: wholesale / retail · PW: 1234
            </p>
          </div>

          <div className="relative text-center my-6">
            <span className="text-xs px-3 relative z-10" style={{ color: "var(--text-dim)", background: "var(--bg)" }}>또는</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full h-px" style={{ background: "var(--border)" }} /></div>
          </div>

          <button className="w-full text-center font-semibold py-3.5 rounded-xl transition-all border border-[rgba(255,255,255,0.2)] hover:border-[#CC0000]"
            style={{ background: "var(--bg-card)", color: "var(--text)" }}>
            신규 회원가입
          </button>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-faint)" }}>
            ⚠ 사업자(도매) 회원은 사업자등록증 인증 후<br />관리자 승인을 거쳐 이용 가능합니다.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
