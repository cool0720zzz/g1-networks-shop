"use client";
import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const count = useCartStore((s) => s.count());

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl transition-colors"
      style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-[1070px] mx-auto px-6">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            G1 <span className="text-[#CC0000]">Networks</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 rounded-lg px-4 py-2.5 w-80"
              style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
            >
              <Search size={16} style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="부품번호, 차종, 브랜드 검색..."
                className="bg-transparent border-none outline-none text-sm w-full"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* Balance */}
            <Link
              href="/charge"
              className="hidden sm:block text-[13px] px-4 py-1.5 rounded-lg transition-all hover:border-[#CC0000]"
              style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)" }}
            >
              잔액 <strong className="text-[#CC0000] font-bold">324,000원</strong>
            </Link>

            <ThemeToggle />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-[rgba(204,0,0,0.3)]"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              href="/mypage"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-[rgba(204,0,0,0.3)]"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
            >
              <User size={18} />
            </Link>
          </div>
        </div>

        {/* Nav row */}
        <nav className="flex gap-0 -mb-px" style={{ borderTop: "1px solid var(--divider)" }}>
          {["전체", "브레이크 패드", "브레이크 디스크", "필터", "엔진오일"].map((cat) => (
            <Link
              key={cat}
              href="/products"
              className="px-5 py-3 text-[13px] font-medium transition-colors hover:text-[#CC0000]"
              style={{ color: "var(--text-sec)" }}
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
