"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useAuthStore } from "@/store/auth";
import { formatPrice } from "@/data/products";

const chargeOptions = [
  { pay: 110000, charge: 100000, vat: 10000 },
  { pay: 220000, charge: 200000, vat: 20000 },
  { pay: 550000, charge: 500000, vat: 50000 },
  { pay: 1100000, charge: 1000000, vat: 100000 },
];

const payMethods = ["신용/체크카드", "계좌이체", "무통장입금"];
const payMethodSub = ["PG 결제", "실시간 이체", "가상계좌"];

export default function ChargePage() {
  return (
    <AuthGuard>
      <ChargeContent />
    </AuthGuard>
  );
}

function ChargeContent() {
  const user = useAuthStore((s) => s.user);
  const chargeBalance = useAuthStore((s) => s.chargeBalance);
  const [selected, setSelected] = useState(1);
  const [payMethod, setPayMethod] = useState(0);
  const [loading, setLoading] = useState(false);
  const opt = chargeOptions[selected];
  const balance = user?.balance ?? 0;

  const handleCharge = async () => {
    if (!confirm(`${formatPrice(opt.pay)} 결제 후 ${formatPrice(opt.charge)}를 충전합니다.\n진행하시겠습니까?`)) return;
    setLoading(true);
    chargeBalance(opt.charge);
    alert("충전이 완료되었습니다!");
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">Charge</span>
            <h1 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>잔액 충전</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>선결제 금액을 충전하여 간편하게 주문하세요</p>
          </div>

          <div className="rounded-2xl p-8 text-center mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="text-[13px] mb-1" style={{ color: "var(--text-sec)" }}>현재 잔액</p>
            <div className="text-[40px] font-black text-[#03C75A]">{balance.toLocaleString("ko-KR")}<small className="text-base" style={{ color: "var(--text-muted)" }}>원</small></div>
          </div>

          <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>충전 금액 선택</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {chargeOptions.map((o, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="rounded-xl p-5 text-center transition-all"
                style={{
                  background: selected === i ? "rgba(204,0,0,0.05)" : "var(--bg-card)",
                  border: selected === i ? "2px solid #CC0000" : "2px solid var(--border)",
                }}>
                <div className="text-xl font-black mb-1" style={{ color: "var(--text)" }}>{(o.pay / 10000).toLocaleString()}만원</div>
                <div className="text-[13px] text-[#03C75A]">{(o.charge / 10000).toLocaleString()}만원 충전</div>
                <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>부가세 {(o.vat / 10000).toLocaleString()}만원 포함</div>
              </button>
            ))}
          </div>

          <div className="rounded-lg p-4 text-xs leading-relaxed mb-6" style={{ background: "rgba(255,214,0,0.05)", border: "1px solid rgba(255,214,0,0.15)", color: "var(--text-sec)" }}>
            <strong className="text-[#FFD600]">⚠ 충전 안내</strong><br />
            - 충전 금액은 부가세(10%)가 포함된 금액입니다<br />
            - 부가세를 제외한 금액이 잔액에 충전됩니다<br />
            - 잔액이 10만원 미만일 경우 상품 구매가 제한됩니다<br />
            - 세금계산서는 매월 말 자동 발행됩니다
          </div>

          <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>결제 수단</h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {payMethods.map((m, i) => (
              <button key={m} onClick={() => setPayMethod(i)}
                className="flex-1 rounded-xl p-4 text-center transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: payMethod === i ? "2px solid #CC0000" : "2px solid var(--border)",
                }}>
                <div className="text-sm font-bold" style={{ color: "var(--text)" }}>{m}</div>
                <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>{payMethodSub[i]}</div>
              </button>
            ))}
          </div>

          <button onClick={handleCharge} disabled={loading} className="w-full bg-[#CC0000] text-white text-base font-bold py-4 rounded-xl hover:bg-[#e00] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "충전 중..." : `${(opt.pay / 10000).toLocaleString()}만원 결제하고 ${(opt.charge / 10000).toLocaleString()}만원 충전하기`}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
