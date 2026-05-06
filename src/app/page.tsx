"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/auth";

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
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // 로그인 상태면 자동으로 샵으로
  useEffect(() => {
    if (isLoggedIn) router.replace("/products");
  }, [isLoggedIn, router]);

  return (
    <>
      {/* ===== 고정 배경 영상 (스티키, 1070px 중앙 정렬) ===== */}
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
        <div className="w-full max-w-[1070px] h-full relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
          {/* 어두운 오버레이 - 가독성 확보 */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* ===== 스크롤되는 콘텐츠 ===== */}
      <div className="relative z-10">

        {/* Landing Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1070px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex flex-col">
              <span className="text-[22px] font-black tracking-tight text-white">
                G1 <span className="text-[#CC0000]">Networks</span>
              </span>
              <span className="text-[10px] tracking-widest text-white/30">
                Automotive Parts Wholesale
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="#brands" className="text-sm text-white/60 transition-colors hover:text-[#CC0000]">취급 브랜드</Link>
              <Link href="#products" className="text-sm text-white/60 transition-colors hover:text-[#CC0000]">취급 상품</Link>
              <Link href="/login" className="text-sm text-white/60 transition-colors hover:text-[#CC0000]">로그인</Link>
              <Link href="/login" className="bg-[#CC0000] text-white text-[13px] font-bold px-6 py-2.5 rounded-xl hover:bg-[#e00] transition-all">
                시작하기
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero - 배경 위에 떠있는 콘텐츠 */}
        <section className="min-h-[calc(100vh-72px)] flex items-center px-6 py-20">
          <div className="max-w-[1070px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left lg:pl-6">
              <span className="inline-block text-[12px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-3xl mb-6"
                style={{ background: "rgba(204,0,0,0.2)", border: "1px solid rgba(204,0,0,0.4)", color: "#ff3333" }}>
                Authorized Dealer
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.15] tracking-tight mb-5 text-white drop-shadow-lg">
                <em className="not-italic text-[#CC0000]">수입차 부품</em><br />공식 판매점
              </h1>
              <p className="text-lg leading-relaxed mb-10 text-white/60">
                인증 정식 상품을<br />최저가로 만나보세요!
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/login" className="bg-[#CC0000] text-white text-[17px] font-bold px-10 py-4 rounded-[14px] hover:bg-[#e00] hover:-translate-y-0.5 transition-all shadow-lg shadow-red-900/30">
                  로그인하고 시작하기
                </Link>
                <Link href="#products" className="text-[15px] font-semibold px-8 py-4 rounded-xl transition-all border border-white/20 hover:border-[#CC0000] text-white backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.3)" }}>
                  취급 상품 보기
                </Link>
              </div>
            </div>

            <div className="w-[340px] shrink-0 lg:pr-6">
              <div className="grid grid-cols-2 gap-3">
                {heroCards.map((c) => (
                  <Link key={c.title} href="/products"
                    className="rounded-[14px] p-5 text-center transition-all hover:-translate-y-0.5 backdrop-blur-md border border-white/10 hover:border-[#CC0000]"
                    style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="text-[28px] mb-2">{c.icon}</div>
                    <h4 className="text-[13px] font-bold mb-0.5 text-white">{c.title}</h4>
                    <p className="text-[10px] text-white/50">{c.sub}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== [V2 NEW] B2B 신뢰 신호 섹션 (히어로 직하단) ===== */}
        <section className="px-6 py-12 backdrop-blur-md" style={{ background: "rgba(0,0,0,0.55)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1070px] mx-auto">
            {/* 파트너 로고 바 */}
            <div className="text-center mb-8">
              <p className="text-[11px] font-bold tracking-[3px] uppercase text-white/50 mb-5">
                ★ 정식 수입 인증 파트너 (Authorized Distributors)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { logo: "BREMBO", desc: "Italy" },
                  { logo: "TRW", desc: "Germany" },
                  { logo: "MANN-FILTER", desc: "Germany" },
                  { logo: "ZF", desc: "Germany" },
                ].map((p) => (
                  <div key={p.logo}
                    className="rounded-xl py-4 text-center transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                    <div className="text-[13px] font-extrabold tracking-wider text-white">{p.logo}</div>
                    <div className="text-[9px] tracking-widest uppercase text-white/40 mt-0.5">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 거래량 카운터 */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { val: "500+", label: "가입 정비소" },
                { val: "12만+", label: "누적 주문" },
                { val: "24h", label: "당일 출고" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#CC0000]">{s.val}</div>
                  <div className="text-[11px] sm:text-xs text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 여기부터 반투명 배경 섹션들 (영상이 살짝 비침) ===== */}
        <div className="backdrop-blur-sm" style={{ background: "rgba(10,10,10,0.72)" }}>

          {/* Brands */}
          <section className="py-20 px-6" id="brands">
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

          {/* [V2 NEW] Testimonials — 정비소 후기 */}
          <section className="py-20 px-6">
            <div className="max-w-[1070px] mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Testimonials</span>
                <h2 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>정비소가 선택한 이유</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>이미 사용 중인 정비소들의 생생한 후기</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { quote: "정식 수입 부품을 도매가로 받을 수 있어서 마진율이 확실히 좋아졌습니다. 당일 출고도 빨라요.", who: "서울 강남구 · OO모터스", grade: "도매" },
                  { quote: "차종 검색이 쉬워서 손님 차에 맞는 부품 찾는 시간이 절반으로 줄었습니다.", who: "경기 분당구 · OO카서비스", grade: "도매" },
                  { quote: "선충전 잔액 시스템이라 매번 결제 안 해도 되고 세금계산서까지 깔끔하게 처리됩니다.", who: "인천 남동구 · OO자동차정비", grade: "도매" },
                ].map((t, i) => (
                  <div key={i}
                    className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[rgba(204,0,0,0.3)]"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-2xl text-[#CC0000] mb-3 font-black">"</div>
                    <p className="text-[14px] leading-relaxed mb-5" style={{ color: "var(--text)" }}>
                      {t.quote}
                    </p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--divider)" }}>
                      <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>{t.who}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(204,0,0,0.15)", color: "#ff5555" }}>
                        {t.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-20 px-6" id="products">
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
        </div>
      </div>
    </>
  );
}
