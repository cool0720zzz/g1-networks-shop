"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { products, formatPrice, getPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useAuthStore, gradeLabel } from "@/store/auth";

const tabs = ["상세정보", "적용차종", "배송/교환", "리뷰 (0)", "Q&A (0)"];

export default function ProductDetailPage() {
  return (
    <AuthGuard>
      <ProductDetailContent />
    </AuthGuard>
  );
}

function ProductDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const addToCart = useCartStore((s) => s.add);
  const user = useAuthStore((s) => s.user);
  const grade = user?.grade ?? "retail";

  if (!product) return <div className="p-20 text-center" style={{ color: "var(--text-muted)" }}>상품을 찾을 수 없습니다.</div>;

  const unitPrice = getPrice(product, grade);
  const balance = user?.balance ?? 0;
  const totalPrice = unitPrice * qty;
  const afterBalance = balance - totalPrice;
  const canPurchase = afterBalance >= 0;

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-[1070px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Images */}
            <div className="w-full lg:w-[480px] shrink-0">
              <div className="w-full h-[480px] rounded-2xl flex items-center justify-center text-sm mb-3"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-dim)" }}>
                {product.brand} {product.name}
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 rounded-lg cursor-pointer transition-colors"
                    style={{ background: "var(--bg-card)", border: i === 0 ? "2px solid #CC0000" : "1px solid var(--input-border)" }} />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#CC0000] font-bold tracking-[2px] uppercase">{product.brand}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    background: grade === "wholesale" ? "rgba(204,0,0,0.15)" : "rgba(3,199,90,0.15)",
                    color: grade === "wholesale" ? "#ff5555" : "#03C75A",
                  }}>
                  {gradeLabel[grade]}가
                </span>
              </div>
              <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>{product.name}</h1>
              <p className="text-[13px] mb-5" style={{ color: "var(--text-muted)" }}>{product.partNumbers.join(" / ")}</p>

              {/* Price box */}
              <div className="rounded-xl p-5 mb-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-[28px] font-black text-[#CC0000]">{formatPrice(unitPrice)}</div>
                <div className="flex items-center gap-3 mt-3 pt-3 text-[13px] flex-wrap" style={{ borderTop: "1px solid var(--border)", color: "var(--text-sec)" }}>
                  내 잔액: <strong className="text-[#03C75A]">{formatPrice(balance)}</strong>
                  &nbsp;|&nbsp;
                  구매 후 잔액: <strong style={{ color: canPurchase ? "var(--text)" : "#ff5555" }}>
                    {formatPrice(afterBalance)}
                  </strong>
                </div>
              </div>

              {/* Options */}
              <div className="mb-5">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-sec)" }}>적용 차종</label>
                <select className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}>
                  {product.compatibleVehicles.map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3 mb-6">
                <label className="text-xs font-semibold" style={{ color: "var(--text-sec)" }}>수량</label>
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid var(--input-border)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 text-base transition-colors"
                    style={{ background: "var(--bg-card)", color: "var(--text)" }}>-</button>
                  <span className="w-12 h-9 flex items-center justify-center text-sm font-bold" style={{ background: "var(--bg)", color: "var(--text)" }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(99, qty + 1))} className="w-9 h-9 text-base transition-colors"
                    style={{ background: "var(--bg-card)", color: "var(--text)" }}>+</button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { addToCart(product, qty); router.push("/cart"); }}
                  disabled={!canPurchase}
                  className="flex-1 bg-[#CC0000] text-white text-base font-bold py-4 rounded-xl hover:bg-[#e00] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {canPurchase ? "바로 구매" : "잔액 부족"}
                </button>
                <button onClick={() => addToCart(product, qty)}
                  disabled={!canPurchase}
                  className="px-6 py-4 rounded-xl text-base font-semibold flex items-center gap-2 transition-all border border-[var(--border)] hover:border-[#CC0000] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "var(--bg-card)", color: "var(--text)" }}>
                  <ShoppingCart size={18} /> 장바구니
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="flex" style={{ borderBottom: "2px solid var(--border)" }}>
              {tabs.map((t, i) => (
                <button key={t} onClick={() => setActiveTab(i)}
                  className="px-7 py-3.5 text-sm font-semibold -mb-[2px] transition-colors"
                  style={{
                    color: activeTab === i ? "#CC0000" : "var(--text-muted)",
                    borderBottom: activeTab === i ? "2px solid #CC0000" : "2px solid transparent",
                  }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="py-8">
              <div className="rounded-xl p-12 text-center text-sm" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-dim)" }}>
                {activeTab === 0 && <>{product.description}<br /><br />상세 이미지가 여기에 표시됩니다</>}
                {activeTab === 1 && <>적용 차종: {product.compatibleVehicles.join(", ")}</>}
                {activeTab === 2 && <>10만원 이상: 무료배송 / 10만원 미만: 4,400원<br />당일 14시 이전 주문: 당일 출고<br /><br />교환/반품: 수령 후 7일 이내 / 장착 후 불가</>}
                {activeTab === 3 && <>등록된 리뷰가 없습니다.</>}
                {activeTab === 4 && <>등록된 문의가 없습니다.</>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
