export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "brake-pad" | "brake-disc" | "filter" | "engine-oil";
  price: number;
  partNumbers: string[];
  compatibleVehicles: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: "bp-brembo-ceramic-f",
    name: "PRIME CERAMIC 브레이크 패드 [전]",
    brand: "Brembo",
    category: "brake-pad",
    price: 59400,
    partNumbers: ["P06064N", "GDB1840"],
    compatibleVehicles: ["BMW 3시리즈", "BMW 5시리즈"],
    description: "세라믹 기반 저분진 프리미엄 브레이크 패드",
  },
  {
    id: "bp-brembo-prime-r",
    name: "PRIME 브레이크 패드 [후]",
    brand: "Brembo",
    category: "brake-pad",
    price: 52800,
    partNumbers: ["P06038N", "GDB1840"],
    compatibleVehicles: ["BMW 3시리즈", "BMW 5시리즈"],
    description: "OE 규격 프리미엄 브레이크 패드",
  },
  {
    id: "bp-trw-cotec-f",
    name: "COTEC 브레이크 패드 [전]",
    brand: "TRW",
    category: "brake-pad",
    price: 42000,
    partNumbers: ["GDB1960", "TPC1852"],
    compatibleVehicles: ["BMW 3시리즈", "BMW X1"],
    description: "TRW COTEC 기술 적용 브레이크 패드",
  },
  {
    id: "bp-trw-dtec-r",
    name: "DTEC 브레이크 패드 [후]",
    brand: "TRW",
    category: "brake-pad",
    price: 38500,
    partNumbers: ["GDB2088", "TPC1920"],
    compatibleVehicles: ["BMW 3시리즈", "BMW X3"],
    description: "TRW DTEC 저소음 브레이크 패드",
  },
  {
    id: "bd-brembo-prime-f",
    name: "PRIME 브레이크 디스크 [전]",
    brand: "Brembo",
    category: "brake-disc",
    price: 88000,
    partNumbers: ["09.C394.13"],
    compatibleVehicles: ["BMW 5시리즈"],
    description: "UV 코팅 프리미엄 브레이크 디스크",
  },
  {
    id: "bd-brembo-prime-r",
    name: "PRIME 브레이크 디스크 [후]",
    brand: "Brembo",
    category: "brake-disc",
    price: 72000,
    partNumbers: ["08.B413.11"],
    compatibleVehicles: ["BMW 3시리즈", "BMW 5시리즈"],
    description: "UV 코팅 리어 브레이크 디스크",
  },
  {
    id: "bd-trw-f",
    name: "브레이크 디스크 [전]",
    brand: "TRW",
    category: "brake-disc",
    price: 65000,
    partNumbers: ["DF6310S"],
    compatibleVehicles: ["BMW 3시리즈"],
    description: "TRW 정밀 가공 프론트 디스크",
  },
  {
    id: "ft-mann-cabin",
    name: "캐빈 에어필터 FreciousPlus",
    brand: "MANN-FILTER",
    category: "filter",
    price: 28600,
    partNumbers: ["FP 25 001"],
    compatibleVehicles: ["BMW 3시리즈"],
    description: "활성탄 캐빈 에어필터",
  },
  {
    id: "ft-mann-oil",
    name: "오일필터",
    brand: "MANN-FILTER",
    category: "filter",
    price: 12800,
    partNumbers: ["HU 816 x"],
    compatibleVehicles: ["BMW 3/5시리즈"],
    description: "MANN 정품 오일필터",
  },
  {
    id: "ft-zf-trans",
    name: "오토미션 오일필터",
    brand: "ZF",
    category: "filter",
    price: 35200,
    partNumbers: ["0501 322 297"],
    compatibleVehicles: ["BMW 전차종"],
    description: "ZF 순정 오토미션 오일필터",
  },
  {
    id: "eo-5w30",
    name: "합성 엔진오일 5W-30 (4L)",
    brand: "Engine Oil",
    category: "engine-oil",
    price: 48000,
    partNumbers: ["API SP", "ACEA C3"],
    compatibleVehicles: ["수입차 전차종"],
    description: "프리미엄 풀 합성 엔진오일",
  },
  {
    id: "eo-5w40",
    name: "합성 엔진오일 5W-40 (4L)",
    brand: "Engine Oil",
    category: "engine-oil",
    price: 52000,
    partNumbers: ["API SP", "ACEA A3/B4"],
    compatibleVehicles: ["수입차 전차종"],
    description: "고성능 풀 합성 엔진오일",
  },
];

export const categories = [
  { id: "brake-pad", name: "브레이크 패드", icon: "🔧" },
  { id: "brake-disc", name: "브레이크 디스크", icon: "⚙" },
  { id: "filter", name: "필터", icon: "🌡" },
  { id: "engine-oil", name: "엔진오일", icon: "💧" },
] as const;

export const brands = ["Brembo", "TRW", "MANN-FILTER", "ZF", "Engine Oil"];

export function formatPrice(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}
