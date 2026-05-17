"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserGrade = "wholesale" | "retail";

export const gradeLabel: Record<UserGrade, string> = {
  wholesale: "도매",
  retail: "소매",
};

export interface User {
  id: string;            // 사업자등록번호 or 일반 아이디
  name: string;          // 업체명/이름
  grade: UserGrade;
  balance: number;       // 잔액 (원)
  approved: boolean;     // 관리자 승인 여부 (Mock에서는 true 고정)
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (id: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  // Mock 전용: 데모용 빠른 등급 전환
  switchGrade: (grade: UserGrade) => void;
  setBalance: (balance: number) => void;
  deductBalance: (amount: number) => boolean;
  chargeBalance: (amount: number) => void;
}

// Mock 사용자 데이터
const mockUsers: Record<string, { password: string; user: User }> = {
  "wholesale": {
    password: "1234",
    user: {
      id: "123-45-67890",
      name: "OO정비소",
      grade: "wholesale",
      balance: 324000,
      approved: true,
    },
  },
  "retail": {
    password: "1234",
    user: {
      id: "retail001",
      name: "홍길동",
      grade: "retail",
      balance: 150000,
      approved: true,
    },
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: async (id, password) => {
        // Mock 인증 로직
        // 데모: "wholesale" / "1234" → 도매 / "retail" / "1234" → 소매
        const account = mockUsers[id];
        if (!account) {
          return { success: false, message: "존재하지 않는 계정입니다. (데모: wholesale 또는 retail 입력)" };
        }
        if (account.password !== password) {
          return { success: false, message: "비밀번호가 일치하지 않습니다. (데모: 1234)" };
        }
        if (!account.user.approved) {
          return { success: false, message: "관리자 승인 대기 중입니다." };
        }
        set({ user: account.user, isLoggedIn: true });
        return { success: true };
      },
      logout: () => set({ user: null, isLoggedIn: false }),
      switchGrade: (grade) =>
        set((s) => (s.user ? { user: { ...s.user, grade } } : s)),
      setBalance: (balance) =>
        set((s) => (s.user ? { user: { ...s.user, balance } } : s)),
      deductBalance: (amount) => {
        let success = false;
        set((s) => {
          if (!s.user) return s;
          if (s.user.balance < amount) return s;
          success = true;
          return { user: { ...s.user, balance: s.user.balance - amount } };
        });
        return success;
      },
      chargeBalance: (amount) =>
        set((s) => (s.user ? { user: { ...s.user, balance: s.user.balance + amount } } : s)),
    }),
    {
      name: "g1-auth-storage",
    }
  )
);
