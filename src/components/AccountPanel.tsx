"use client";
import Link from "next/link";
import { Wallet, Package, Repeat, FileText } from "lucide-react";
import { useAuthStore, gradeLabel } from "@/store/auth";
import { formatPrice } from "@/data/products";

/**
 * V2 NEW: 인증 후 샵 메인의 "내 계정 미니 패널"
 * 잔액, 진행중 주문, 자주 시킨 부품 재주문, 세금계산서 등 핵심 정보 한눈에
 */
export default function AccountPanel() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  const isWholesale = user.grade === "wholesale";

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-6"
      style={{
        background: `linear-gradient(135deg, ${isWholesale ? "rgba(204,0,0,0.08)" : "rgba(3,199,90,0.08)"} 0%, var(--bg-card) 60%)`,
        border: `1px solid ${isWholesale ? "rgba(204,0,0,0.2)" : "rgba(3,199,90,0.2)"}`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-base font-black"
            style={{
              background: isWholesale ? "rgba(204,0,0,0.15)" : "rgba(3,199,90,0.15)",
              color: isWholesale ? "#ff5555" : "#03C75A",
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: "var(--text)" }}>
                {user.name}님
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  background: isWholesale ? "rgba(204,0,0,0.15)" : "rgba(3,199,90,0.15)",
                  color: isWholesale ? "#ff5555" : "#03C75A",
                }}
              >
                {gradeLabel[user.grade]}
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {isWholesale ? "도매가 자동 적용 중" : "소매가 자동 적용 중"}
            </p>
          </div>
        </div>
        <Link
          href="/mypage"
          className="text-[12px] font-semibold px-4 py-2 rounded-lg transition-all border border-[var(--border)] hover:border-[#CC0000] whitespace-nowrap"
          style={{ color: "var(--text-sec)" }}
        >
          마이페이지 →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* 잔액 */}
        <Link
          href="/charge"
          className="rounded-xl p-3 transition-all hover:border-[rgba(204,0,0,0.3)]"
          style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Wallet size={12} style={{ color: "#CC0000" }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              잔액
            </span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#CC0000]">{formatPrice(user.balance)}</div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            + 충전하기
          </div>
        </Link>

        {/* 진행중 주문 */}
        <Link
          href="/mypage"
          className="rounded-xl p-3 transition-all hover:border-[rgba(204,0,0,0.3)]"
          style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Package size={12} style={{ color: "#03C75A" }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              진행중
            </span>
          </div>
          <div className="text-base sm:text-lg font-black" style={{ color: "var(--text)" }}>
            2건
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            배송 추적 →
          </div>
        </Link>

        {/* 자주 시킨 부품 재주문 */}
        <button
          onClick={() => alert("재주문 기능은 곧 추가됩니다 (Mock)")}
          className="rounded-xl p-3 text-left transition-all hover:border-[rgba(204,0,0,0.3)]"
          style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Repeat size={12} style={{ color: "#FFD600" }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              빠른 재주문
            </span>
          </div>
          <div className="text-[12px] font-bold leading-tight" style={{ color: "var(--text)" }}>
            PRIME CERAMIC [후]
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            지난 주문 →
          </div>
        </button>

        {/* 세금계산서 */}
        <button
          onClick={() => alert("세금계산서는 매월 말 자동 발행됩니다 (Mock)")}
          className="rounded-xl p-3 text-left transition-all hover:border-[rgba(204,0,0,0.3)]"
          style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <FileText size={12} style={{ color: "#0099ff" }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              세금계산서
            </span>
          </div>
          <div className="text-[12px] font-bold" style={{ color: "var(--text)" }}>
            {isWholesale ? "이번달 자동 발행" : "필요시 요청"}
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            상세 →
          </div>
        </button>
      </div>
    </div>
  );
}
