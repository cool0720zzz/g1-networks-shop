"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useCartStore } from "@/store/cart";
import { useAuthStore, gradeLabel } from "@/store/auth";
import { formatPrice, getPrice } from "@/data/products";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  return (
    <AuthGuard>
      <CartContent />
    </AuthGuard>
  );
}

function CartContent() {
  const router = useRouter();
  const { items, remove, updateQty, total, clear } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const deductBalance = useAuthStore((s) => s.deductBalance);
  const grade = user?.grade ?? "retail";
  const balance = user?.balance ?? 0;
  const orderTotal = total(grade);
  const shipping = orderTotal >= 100000 ? 0 : orderTotal === 0 ? 0 : 4400;
  const finalTotal = orderTotal + shipping;
  const afterBalance = balance - finalTotal;
  const canOrder = afterBalance >= 0 && items.length > 0;

  const handleOrder = () => {
    if (!canOrder) return;
    if (!confirm(`주문하시겠습니까?\n결제 금액: ${formatPrice(finalTotal)}\n주문 후 잔액: ${formatPrice(afterBalance)}`)) return;
    const result = deductBalance(finalTotal);
    if (!result) return alert("잔액이 부족합니다");
    clear();
    alert("주문이 완료되었습니다!");
    router.push("/mypage");
  };

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-[1070px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Cart</span>
            <h1 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>장바구니</h1>
            {user && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: grade === "wholesale" ? "#ff5555" : "#03C75A" }}>{gradeLabel[grade]}</strong>
                {" "}회원가 적용 · {items.length}개 상품
              </p>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>장바구니가 비어 있습니다</p>
              <Link href="/products" className="bg-[#CC0000] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#e00] transition-all">
                상품 보러가기
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Items */}
              <div className="flex-1 space-y-3">
                {items.map((item) => {
                  const itemPrice = getPrice(item.product, grade);
                  return (
                    <div key={item.product.id} className="flex gap-4 rounded-xl p-5 transition-colors hover:border-[rgba(204,0,0,0.3)]"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="w-24 h-24 rounded-lg shrink-0 flex items-center justify-center text-[11px]"
                        style={{ background: "var(--bg-card-hover)", color: "var(--text-dim)" }}>{item.product.brand}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{item.product.name}</h4>
                        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{item.product.partNumbers.join(" | ")}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid var(--input-border)" }}>
                            <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="w-7 h-7 text-xs"
                              style={{ background: "var(--bg-card)", color: "var(--text)" }}>-</button>
                            <span className="w-8 h-7 flex items-center justify-center text-xs font-bold" style={{ background: "var(--bg)", color: "var(--text)" }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="w-7 h-7 text-xs"
                              style={{ background: "var(--bg-card)", color: "var(--text)" }}>+</button>
                          </div>
                          <span className="text-base font-bold text-[#CC0000]">{formatPrice(itemPrice * item.qty)}</span>
                          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                            ({formatPrice(itemPrice)} × {item.qty})
                          </span>
                          <button onClick={() => remove(item.product.id)} className="ml-auto p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                            style={{ color: "var(--text-dim)" }}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="rounded-2xl p-6 sticky top-24" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>주문 요약</h3>
                  <div className="flex justify-between py-2 text-sm" style={{ color: "var(--text-sec)" }}>
                    <span>상품 금액</span><span>{formatPrice(orderTotal)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm" style={{ color: "var(--text-sec)" }}>
                    <span>배송비</span><span className={shipping === 0 ? "text-[#03C75A]" : ""}>{shipping === 0 ? "무료" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between py-4 text-xl font-black" style={{ borderTop: "1px solid var(--border)", color: "var(--text)" }}>
                    <span>결제 금액</span><span className="text-[#CC0000]">{formatPrice(finalTotal)}</span>
                  </div>

                  {afterBalance >= 0 ? (
                    <div className="rounded-lg p-3 mt-4 text-[13px] text-[#03C75A]" style={{ background: "rgba(3,199,90,0.08)", border: "1px solid rgba(3,199,90,0.2)" }}>
                      ✓ 현재 잔액: {formatPrice(balance)}<br />주문 후 잔액: {formatPrice(afterBalance)}
                    </div>
                  ) : (
                    <div className="rounded-lg p-3 mt-4 text-[13px] text-[#ff5555]" style={{ background: "rgba(204,0,0,0.08)", border: "1px solid rgba(204,0,0,0.2)" }}>
                      ⚠ 잔액이 {formatPrice(Math.abs(afterBalance))} 부족합니다
                    </div>
                  )}

                  {afterBalance < 100000 && afterBalance >= 0 && (
                    <div className="rounded-lg p-3 mt-2 text-[13px] text-[#FFD600]" style={{ background: "rgba(255,214,0,0.08)", border: "1px solid rgba(255,214,0,0.2)" }}>
                      ⚠ 주문 후 잔액이 10만원 미만입니다. 추가 충전을 권장합니다.
                    </div>
                  )}

                  <button
                    onClick={handleOrder}
                    disabled={!canOrder}
                    className="w-full bg-[#CC0000] text-white font-bold py-4 rounded-xl mt-4 hover:bg-[#e00] transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed">
                    주문하기
                  </button>
                  <Link href="/charge" className="block w-full text-center text-[13px] font-semibold py-3 rounded-xl mt-2 transition-all border border-[var(--border)] hover:border-[#CC0000]"
                    style={{ background: "var(--bg-card-hover)", color: "var(--text)" }}>
                    잔액 충전하기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
