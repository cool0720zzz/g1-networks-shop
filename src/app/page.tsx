"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

const heroCards = [
  { icon: "🔧", title: "브레이크 패드", sub: "Brembo / TRW" },
  { icon: "⚙", title: "브레이크 디스크", sub: "Brembo / TRW" },
  { icon: "🌡", title: "필터", sub: "MANN / ZF" },
  { icon: "💧", title: "엔진오일", sub: "Premium Grade" },
];

const brandRows = [
  [
    { logo: "BREMBO", name: "Brembo", desc: "브레이크 패드 / 디스크" },
    { logo: "TRW", name: "TRW", desc: "브레이크 패드 / 디스크" },
  ],
  [
    { logo: "MANN", name: "MANN-FILTER", desc: "에어필터 / 오일필터 / 캐빈필터" },
    { logo: "ZF", name: "ZF", desc: "필터 시스템" },
  ],
];

const catCards = [
  { icon: "🔧", title: "브레이크 패드", desc: "수입차 전용\n프리미엄 브레이크 패드", brands: ["Brembo", "TRW"] },
  { icon: "⚙", title: "브레이크 디스크", desc: "정밀 가공\nOE 규격 디스크", brands: ["Brembo", "TRW"] },
  { icon: "🌡", title: "필터", desc: "에어 / 오일 / 캐빈\n각종 필터", brands: ["MANN", "ZF"] },
  { icon: "💧", title: "엔진오일", desc: "프리미엄 등급\n수입차 전용 엔진오일", brands: ["Premium"] },
];

export default function Home() {
  return (
    <>
      {/* Landing Header */}
      <div className="max-w-[1070px] mx-auto px-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span className="text-[22px] font-black tracking-tight" style={{ color: "var(--text)" }}>
            G1 <span className="text-[#CC0000]">Networks</span>
          </span>
          <span className="text-[10px] tracking-widest" style={{ color: "var(--text-dim)" }}>
            Automotive Parts Wholesale
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/products" className="text-sm transition-colors hover:text-[#CC0000]" style={{ color: "var(--text-sec)" }}>상품 보기</Link>
          <Link href="/charge" className="text-sm transition-colors hover:text-[#CC0000]" style={{ color: "var(--text-sec)" }}>잔액 충전</Link>
          <Link href="/login" className="text-sm transition-colors hover:text-[#CC0000]" style={{ color: "var(--text-sec)" }}>로그인</Link>
          <ThemeToggle />
          <Link href="/products" className="bg-[#CC0000] text-white text-[13px] font-bold px-6 py-2.5 rounded-xl hover:bg-[#e00] transition-all">
            주문하기
          </Link>
        </nav>
      </div>

      {/* Hero */}
      <section className="min-h-[600px] flex items-center px-6 py-20" style={{ background: "var(--hero-grad)" }}>
        <div className="max-w-[1070px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[12px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-3xl mb-6"
              style={{ background: "rgba(204,0,0,0.12)", border: "1px solid rgba(204,0,0,0.25)", color: "#CC0000" }}>
              Authorized Dealer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.15] tracking-tight mb-5" style={{ color: "var(--text)" }}>
              <em className="not-italic text-[#CC0000]">수입차 부품</em><br />공식 판매점
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-sec)" }}>
              인증 정식 상품을<br />최저가로 만나보세요!
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/products" className="bg-[#CC0000] text-white text-[17px] font-bold px-10 py-4 rounded-[14px] hover:bg-[#e00] hover:-translate-y-0.5 transition-all">
                상품 둘러보기
              </Link>
              <Link href="/charge" className="text-[15px] font-semibold px-8 py-4 rounded-xl transition-all border border-[rgba(255,255,255,0.2)] hover:border-[#CC0000]"
                style={{ background: "var(--bg-card)", color: "var(--text)" }}>
                잔액 충전하기
              </Link>
            </div>
          </div>

          <div className="w-[340px] shrink-0">
            <div className="grid grid-cols-2 gap-3">
              {heroCards.map((c) => (
                <Link key={c.title} href="/products"
                  className="rounded-[14px] p-5 text-center transition-all hover:-translate-y-0.5 hover:border-[rgba(204,0,0,0.3)]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-[28px] mb-2">{c.icon}</div>
                  <h4 className="text-[13px] font-bold mb-0.5" style={{ color: "var(--text)" }}>{c.title}</h4>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{c.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 px-6">
        <div className="max-w-[1070px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Authorized Brands</span>
            <h2 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>취급 브랜드</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>인증 정식 수입 브랜드만 취급합니다</p>
          </div>
          {brandRows.map((row, ri) => (
            <div key={ri} className="flex flex-col sm:flex-row gap-4 mb-4">
              {row.map((b) => (
                <Link key={b.name} href="/products"
                  className="flex-1 flex items-center gap-4 rounded-[14px] p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(204,0,0,0.3)]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[10px] font-extrabold shrink-0"
                    style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
                    {b.logo}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold" style={{ color: "var(--text)" }}>{b.name}</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6" style={{ background: "var(--bg-surface)" }}>
        <div className="text-center mb-12">
          <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Products</span>
          <h2 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>취급 상품</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>인증 정식 수입차 부품을 최저가로 제공합니다</p>
        </div>
        <div className="max-w-[1070px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {catCards.map((c) => (
            <Link key={c.title} href="/products"
              className="rounded-2xl p-9 text-center transition-all hover:-translate-y-1 hover:border-[rgba(204,0,0,0.3)]"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-[40px] mb-4">{c.icon}</div>
              <h3 className="text-lg font-extrabold mb-1.5" style={{ color: "var(--text)" }}>{c.title}</h3>
              <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
              <div className="flex gap-1.5 justify-center flex-wrap mt-3">
                {c.brands.map((br) => (
                  <span key={br} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: "rgba(204,0,0,0.08)", color: "#CC0000" }}>{br}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center rounded-3xl p-16 relative overflow-hidden"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h2 className="text-[28px] font-black mb-3" style={{ color: "var(--text)" }}>지금 바로 시작하세요</h2>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--text-sec)" }}>
            선충전 시스템으로 간편하게 주문하고<br />최저가로 수입차 부품을 만나보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-[#CC0000] text-white text-[17px] font-bold px-10 py-4 rounded-[14px] hover:bg-[#e00] transition-all">
              회원가입
            </Link>
            <Link href="/products" className="text-[15px] font-semibold px-8 py-4 rounded-xl transition-all border border-[rgba(255,255,255,0.2)] hover:border-[#CC0000]"
              style={{ background: "var(--bg-card-hover)", color: "var(--text)" }}>
              상품 보기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
