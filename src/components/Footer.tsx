import Link from "next/link";

export default function Footer() {
  return (
    <footer className="transition-colors" style={{ background: "var(--footer-bg)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1070px] mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          {/* Company */}
          <div className="md:col-span-1">
            <div className="text-xl font-black mb-3" style={{ color: "var(--text)" }}>
              G1 <span className="text-[#CC0000]">Networks</span>
            </div>
            <p className="text-xs leading-7" style={{ color: "var(--text-faint)" }}>
              G1네트웍스 | 대표: 양훈<br />
              사업자등록번호: 000-00-00000<br />
              주소: 서울특별시 OO구 OO로 00<br />
              고객센터: 02-0000-0000<br />
              이메일: contact@g1networks.co.kr
            </p>
            <p className="text-[10px] mt-2" style={{ color: "var(--text-dim)" }}>
              Design &amp; Management by AIB Corp.
            </p>
          </div>

          {/* Links */}
          {[
            { title: "고객지원", links: ["배송 안내", "교환/반품", "자주 묻는 질문", "1:1 문의"] },
            { title: "카테고리", links: ["브레이크 패드", "브레이크 디스크", "필터", "엔진오일"] },
            { title: "정책", links: ["이용약관", "개인정보처리방침", "사업자 인증 안내"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-bold mb-4 tracking-wider uppercase" style={{ color: "var(--text-sec)" }}>
                {col.title}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link}
                  href={col.title === "카테고리" ? "/products" : "#"}
                  className="block text-[13px] py-1 px-2 -mx-2 rounded transition-all text-[var(--text-faint)] hover:bg-[rgba(204,0,0,0.15)] hover:!text-white hover:font-bold"
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-5 text-center text-[11px]" style={{ borderTop: "1px solid var(--divider)", color: "var(--text-dim)" }}>
          &copy; 2026 G1네트웍스. All Rights Reserved. | Design by AIB Corp.
        </div>
      </div>
    </footer>
  );
}
