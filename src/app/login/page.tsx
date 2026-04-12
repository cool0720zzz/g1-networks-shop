"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[28px] font-black text-center mb-2" style={{ color: "var(--text)" }}>
            G1 <span className="text-[#CC0000]">Networks</span>
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: "var(--text-muted)" }}>수입차 부품 공식 판매점 B2B</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>아이디 (사업자등록번호)</label>
              <input type="text" placeholder="000-00-00000" className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#CC0000]"
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>비밀번호</label>
              <input type="password" placeholder="비밀번호 입력" className="w-full rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#CC0000]"
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }} />
            </div>
          </div>

          <Link href="/mypage" className="block w-full bg-[#CC0000] text-white text-center font-bold py-3.5 rounded-xl mt-4 hover:bg-[#e00] transition-all">
            로그인
          </Link>

          <div className="relative text-center my-6">
            <span className="text-xs px-3 relative z-10" style={{ color: "var(--text-dim)", background: "var(--bg)" }}>또는</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full h-px" style={{ background: "var(--border)" }} /></div>
          </div>

          <button className="w-full text-center font-semibold py-3.5 rounded-xl transition-all text-[15px]"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}>
            신규 사업자 회원가입
          </button>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-faint)" }}>
            &#9888; B2B 전용 쇼핑몰입니다.<br />사업자등록증 인증 후 이용 가능합니다.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
