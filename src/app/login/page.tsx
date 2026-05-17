"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, User as UserIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/auth";

type Mode = "wholesale" | "retail";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();

  // [V2 NEW] 좌측 도매 / 우측 소매 진입 분리. 기본값은 도매(B2B 메인 타겟)
  const [mode, setMode] = useState<Mode>("wholesale");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.replace("/products");
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(id, password);
    setLoading(false);
    if (result.success) router.push("/products");
    else setError(result.message || "로그인에 실패했습니다.");
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

  const isWholesale = mode === "wholesale";
  const accent = isWholesale ? "#ff5555" : "#03C75A";
  const accentBg = isWholesale ? "rgba(204,0,0,0.1)" : "rgba(3,199,90,0.1)";
  const accentBorder = isWholesale ? "rgba(204,0,0,0.3)" : "rgba(3,199,90,0.3)";

  return (
    <>
      <main className="flex-1 flex items-center justify-center px-6 py-16" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[900px]">
          <Link href="/" className="block mb-8">
            <h1 className="text-[28px] font-black text-center mb-2" style={{ color: "var(--text)" }}>
              G1 <span className="text-[#CC0000]">Networks</span>
            </h1>
            <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>수입차 부품 공식 판매점</p>
          </Link>

          {/* [V2 NEW] 도매/소매 모드 토글 — 좌우 분할 */}
          <div
            className="grid grid-cols-2 gap-2 p-2 rounded-2xl mb-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <button
              type="button"
              onClick={() => { setMode("wholesale"); setId(""); setError(""); }}
              className="rounded-xl p-4 sm:p-5 text-left transition-all"
              style={{
                background: isWholesale ? "rgba(204,0,0,0.1)" : "transparent",
                border: isWholesale ? "1px solid rgba(204,0,0,0.3)" : "1px solid transparent",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase size={18} style={{ color: isWholesale ? "#ff5555" : "var(--text-muted)" }} />
                <span className="text-sm font-bold" style={{ color: isWholesale ? "#ff5555" : "var(--text-sec)" }}>
                  사업자 (도매)
                </span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                정비소·카센터 등<br />
                사업자등록증 인증 후 도매가 적용
              </p>
            </button>

            <button
              type="button"
              onClick={() => { setMode("retail"); setId(""); setError(""); }}
              className="rounded-xl p-4 sm:p-5 text-left transition-all"
              style={{
                background: !isWholesale ? "rgba(3,199,90,0.1)" : "transparent",
                border: !isWholesale ? "1px solid rgba(3,199,90,0.3)" : "1px solid transparent",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <UserIcon size={18} style={{ color: !isWholesale ? "#03C75A" : "var(--text-muted)" }} />
                <span className="text-sm font-bold" style={{ color: !isWholesale ? "#03C75A" : "var(--text-sec)" }}>
                  일반 (소매)
                </span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                일반 구매자<br />
                즉시 가입 가능, 소매가 적용
              </p>
            </button>
          </div>

          {/* 로그인 폼 */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${accentBorder}`,
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}
              >
                {isWholesale ? "사업자 도매 로그인" : "일반 소매 로그인"}
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>
                  {isWholesale ? "사업자등록번호" : "아이디"}
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder={isWholesale ? "000-00-00000" : "아이디를 입력하세요"}
                  className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text)",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              {error && (
                <div
                  className="rounded-lg px-4 py-3 text-[13px]"
                  style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", color: "#ff5555" }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white text-center font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                style={{ background: isWholesale ? "#CC0000" : "#03C75A" }}
              >
                {loading ? "로그인 중..." : `${isWholesale ? "도매" : "소매"} 로그인`}
              </button>
            </form>

            <button
              type="button"
              onClick={() => alert(`${isWholesale ? "사업자(도매)" : "일반(소매)"} 회원가입은 곧 추가됩니다 (Mock)`)}
              className="w-full mt-3 text-center text-sm font-semibold py-3 rounded-xl transition-all border"
              style={{ background: "transparent", borderColor: accentBorder, color: accent }}
            >
              {isWholesale ? "신규 사업자 회원가입 (등록증 필요)" : "신규 일반 회원가입 (즉시 가입)"}
            </button>

            <p className="text-center text-xs mt-5" style={{ color: "var(--text-faint)" }}>
              {isWholesale
                ? "⚠ 사업자(도매) 가입은 사업자등록증 인증 + 관리자 승인 후 이용 가능합니다."
                : "💡 일반 회원은 가입 즉시 소매가로 이용 가능합니다."}
            </p>
          </div>

          {/* 데모 빠른 로그인 — 개발 환경에서만 노출 */}
          {process.env.NODE_ENV === "development" && (
            <div
              className="mt-6 rounded-xl p-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
