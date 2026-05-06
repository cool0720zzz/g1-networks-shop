"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useAuthStore, gradeLabel } from "@/store/auth";
import { formatPrice } from "@/data/products";

const orders = [
  { date: "2026-04-11", name: "PRIME CERAMIC 브레이크 패드 [후] 외 1건", status: "배송 중", statusColor: "#03C75A", amount: "148,200원" },
  { date: "2026-04-08", name: "TRW COTEC 브레이크 패드 [전] x2", status: "배송 완료", statusColor: "var(--text-sec)", amount: "84,000원" },
  { date: "2026-04-03", name: "MANN 캐빈 에어필터 x3", status: "배송 완료", statusColor: "var(--text-sec)", amount: "85,800원" },
];

const balanceHistory = [
  { date: "2026-04-10", desc: "잔액 충전 (카드결제 22만원)", amount: "+200,000원", color: "#03C75A" },
  { date: "2026-04-11", desc: "주문 #20260411-001", amount: "-148,200원", color: "#CC0000" },
  { date: "2026-04-08", desc: "주문 #20260408-002", amount: "-84,000원", color: "#CC0000" },
];

const menuItems = ["대시보드", "주문 내역", "잔액 충전/내역", "회원 정보 수정", "배송지 관리", "1:1 문의"];

export default function MyPage() {
  return (
    <AuthGuard>
      <MyPageContent />
    </AuthGuard>
  );
}

function MyPageContent() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-[1070px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#CC0000] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">My Page</span>
            <h1 className="text-[32px] font-black mb-2" style={{ color: "var(--text)" }}>마이페이지</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              <strong style={{ color: user.grade === "wholesale" ? "#ff5555" : "#03C75A" }}>
                [{gradeLabel[user.grade]}]
              </strong>
              {" "}{user.name}님 환영합니다
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-56 shrink-0">
              <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {menuItems.map((m, i) => (
                  <Link key={m} href={m === "잔액 충전/내역" ? "/charge" : "#"}
                    className="block px-5 py-3.5 text-[13px] transition-all hover:text-[#CC0000] hover:bg-[rgba(204,0,0,0.05)]"
                    style={{
                      color: i === 0 ? "#CC0000" : "var(--text-sec)",
                      fontWeight: i === 0 ? 700 : 400,
                      borderBottom: i < menuItems.length - 1 ? "1px solid var(--divider)" : "none",
                    }}>
                    {m}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <Link href="/charge"
                  className="rounded-xl p-5 text-center transition-all hover:border-[rgba(204,0,0,0.3)]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-2xl font-black text-[#CC0000]">{user.balance.toLocaleString("ko-KR")}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>잔액 (원)</div>
                </Link>
                <div className="rounded-xl p-5 text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-2xl font-black text-[#CC0000]">12</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>총 주문</div>
                </div>
                <div className="rounded-xl p-5 text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-2xl font-black text-[#CC0000]">2</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>배송 중</div>
                </div>
              </div>

              {/* Account Info */}
              <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>회원 정보</h3>
              <div className="rounded-xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>회원 등급</div>
                    <div className="font-bold" style={{ color: user.grade === "wholesale" ? "#ff5555" : "#03C75A" }}>
                      {gradeLabel[user.grade]} 회원
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{user.grade === "wholesale" ? "사업자등록번호" : "아이디"}</div>
                    <div className="font-medium" style={{ color: "var(--text)" }}>{user.id}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{user.grade === "wholesale" ? "업체명" : "이름"}</div>
                    <div className="font-medium" style={{ color: "var(--text)" }}>{user.name}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>승인 상태</div>
                    <div className="font-medium text-[#03C75A]">✓ 승인 완료</div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>최근 주문</h3>
              <div className="rounded-xl overflow-hidden mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {orders.map((o, i) => (
                  <div key={i} className="flex justify-between px-5 py-4 text-[13px] flex-wrap gap-2"
                    style={{ borderBottom: i < orders.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-sec)" }}>
                    <div>
                      <span className="text-[#CC0000] font-semibold">{o.date}</span>
                      <span className="ml-3">{o.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold" style={{ color: o.statusColor }}>{o.status}</span>
                      <span className="ml-2" style={{ color: "var(--text-sec)" }}>{o.amount}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-bold mb-4" style={{ color: "var(--text)" }}>충전/차감 내역</h3>
              <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {balanceHistory.map((b, i) => (
                  <div key={i} className="flex justify-between px-5 py-4 text-[13px] flex-wrap gap-2"
                    style={{ borderBottom: i < balanceHistory.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-sec)" }}>
                    <div>
                      <span>{b.date}</span>
                      <span className="ml-3">{b.desc}</span>
                    </div>
                    <div className="font-bold" style={{ color: b.color }}>{b.amount}</div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs mt-6" style={{ color: "var(--text-faint)" }}>
                현재 잔액: <strong className="text-[#03C75A]">{formatPrice(user.balance)}</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
