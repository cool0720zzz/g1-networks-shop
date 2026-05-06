"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { products, brands, formatPrice, getPrice } from "@/data/products";
import { useAuthStore, gradeLabel } from "@/store/auth";

const categoryFilters = ["전체", "브레이크 패드", "브레이크 디스크", "필터", "엔진오일"];
const catMap: Record<string, string> = { "브레이크 패드": "brake-pad", "브레이크 디스크": "brake-disc", "필터": "filter", "엔진오일": "engine-oil" };

export default function ProductsPage() {
  return (
    <AuthGuard>
      <ProductsContent />
    </AuthGuard>
  );
}

function ProductsContent() {
  const user = useAuthStore((s) => s.user);
  const grade = user?.grade ?? "retail";

  const [activeCat, setActiveCat] = useState("전체");
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");

  const filtered = products.filter((p) => {
    if (activeCat !== "전체" && p.category !== catMap[activeCat]) return false;
    if (activeBrands.length > 0 && !activeBrands.includes(p.brand)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return getPrice(a, grade) - getPrice(b, grade);
    if (sort === "price-desc") return getPrice(b, grade) - getPrice(a, grade);
    return 0;
  });

  const toggleBrand = (b: string) => setActiveBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-[1070px] mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Products</span>
            <h1 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>상품 목록</h1>
            {user && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: user.grade === "wholesale" ? "#ff5555" : "#03C75A" }}>
                  {gradeLabel[user.grade]}
                </strong>
                {" "}회원가로 표시 중입니다
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-60 shrink-0 space-y-4">
              <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <h3 className="text-[13px] font-bold text-[#CC0000] tracking-wider uppercase mb-3">카테고리</h3>
                {categoryFilters.map((c) => (
                  <button key={c} onClick={() => setActiveCat(c)}
                    className="flex items-center gap-2 w-full py-1.5 text-[13px] transition-colors hover:text-[#CC0000]"
                    style={{ color: activeCat === c ? "#CC0000" : "var(--text-sec)", fontWeight: activeCat === c ? 700 : 400 }}>
                    <span className="w-4 h-4 rounded border shrink-0" style={{
                      borderColor: activeCat === c ? "#CC0000" : "var(--text-dim)",
                      background: activeCat === c ? "#CC0000" : "transparent"
                    }} />
                    {c}
                  </button>
                ))}
              </div>
              <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <h3 className="text-[13px] font-bold text-[#CC0000] tracking-wider uppercase mb-3">브랜드</h3>
                {brands.map((b) => (
                  <button key={b} onClick={() => toggleBrand(b)}
                    className="flex items-center gap-2 w-full py-1.5 text-[13px] transition-colors hover:text-[#CC0000]"
                    style={{ color: activeBrands.includes(b) ? "#CC0000" : "var(--text-sec)", fontWeight: activeBrands.includes(b) ? 700 : 400 }}>
                    <span className="w-4 h-4 rounded border shrink-0" style={{
                      borderColor: activeBrands.includes(b) ? "#CC0000" : "var(--text-dim)",
                      background: activeBrands.includes(b) ? "#CC0000" : "transparent"
                    }} />
                    {b}
                  </button>
                ))}
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-5">
                <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                  총 <strong style={{ color: "var(--text)" }}>{sorted.length}</strong>개 상품
                </span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="text-[13px] rounded-lg px-3 py-2 outline-none"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}>
                  <option value="popular">인기순</option>
                  <option value="price-asc">가격 낮은순</option>
                  <option value="price-desc">가격 높은순</option>
                </select>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`}
                    className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(204,0,0,0.3)]"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="h-48 flex items-center justify-center text-xs" style={{ background: "var(--bg-card-hover)", color: "var(--text-dim)" }}>
                      {p.brand} IMAGE
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] text-[#CC0000] font-semibold tracking-wider uppercase mb-1">{p.brand}</div>
                      <div className="text-sm font-semibold mb-1 leading-snug" style={{ color: "var(--text)" }}>{p.name}</div>
                      <div className="text-[11px] mb-2" style={{ color: "var(--text-muted)" }}>{p.partNumbers.join(" / ")}</div>
                      <div className="text-lg font-black text-[#CC0000]">{formatPrice(getPrice(p, grade))}</div>
                      <div className="flex gap-1 flex-wrap mt-2">
                        {p.compatibleVehicles.map((v) => (
                          <span key={v} className="text-[10px] px-2 py-0.5 rounded" style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", color: "var(--text-sec)" }}>{v}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
