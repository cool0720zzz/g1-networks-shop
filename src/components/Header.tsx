"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search, LogOut, Wallet } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useAuthStore, gradeLabel } from "@/store/auth";
import { formatPrice } from "@/data/products";

export default function Header() {
  const count = useCartStore((s) => s.count());
  const { user, isLoggedIn, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl transition-colors"
      style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-[1070px] mx-auto px-6">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          <Link href={mounted && isLoggedIn ? "/products" : "/"} className="text-2xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            G1 <span className="text-[#CC0000]">Networks</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 rounded-lg px-4 py-2.5 w-72"
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

            {/* User Info / Balance / Login */}
            {mounted && isLoggedIn && user ? (
              <>
                {/* 등급 배지 */}
                <span
                  className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-1 rounded-md"
                  style={{
                    background: user.grade === "wholesale" ? "rgba(204,0,0,0.15)" : "rgba(3,199,90,0.15)",
                    color: user.grade === "wholesale" ? "#ff5555" : "#03C75A",
                    border: `1px solid ${user.grade === "wholesale" ? "rgba(204,0,0,0.3)" : "rgba(3,199,90,0.3)"}`,
                  }}
                >
                  {gradeLabel[user.grade]}
                </span>

                {/* 잔액 - sm 이상 */}
                <Link
                  href="/charge"
                  className="hidden sm:block text-[13px] px-4 py-1.5 rounded-lg transition-all hover:border-[#CC0000]"
                  style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", color: "var(--text)" }}
                >
                  잔액 <strong className="text-[#CC0000] font-bold">{formatPrice(user.balance)}</strong>
                </Link>

                {/* 잔액 mini - 모바일 전용 */}
                <Link
                  href="/charge"
                  className="sm:hidden flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", color: "var(--text)" }}
                  aria-label={`잔액 ${formatPrice(user.balance)}`}
                >
                  <Wallet size={13} className="text-[#CC0000]" />
                  <strong className="text-[#CC0000] font-bold">{formatPrice(user.balance)}</strong>
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-[#CC0000]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
                >
                  <ShoppingCart size={18} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>

                {/* MyPage */}
                <Link
                  href="/mypage"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-[#CC0000]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
                  title={user.name}
                >
                  <User size={18} />
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-[#CC0000]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
                  title="로그아웃"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#CC0000] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg hover:bg-[#e00] transition-all"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 전용 검색바 */}
        <div
          className="md:hidden flex items-center gap-2 rounded-lg px-3 py-2 mb-2"
          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
        >
          <Search size={15} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="부품번호, 차종, 브랜드 검색..."
            className="bg-transparent border-none outline-none text-sm w-full"
            style={{ color: "var(--text)" }}
          />
        </div>

        {/* Nav row */}
        <nav className="flex gap-0 -mb-px overflow-x-auto" style={{ borderTop: "1px solid var(--divider)" }}>
          {["전체", "브레이크 패드", "브레이크 디스크", "필터", "엔진오일"].map((cat) => (
            <Link
              key={cat}
              href="/products"
              className="px-5 py-3 text-[13px] font-medium transition-colors hover:text-[#CC0000] whitespace-nowrap"
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
