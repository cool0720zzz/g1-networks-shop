"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { vehicleMakes } from "@/data/vehicles";

/**
 * V2 NEW: 차종 빠른 검색 위젯
 * Make → Model → Trim 단계적 선택 + 부품번호 직접 검색
 */
export default function VehicleSearch() {
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [trim, setTrim] = useState("");
  const [partNumber, setPartNumber] = useState("");

  const make = useMemo(() => vehicleMakes.find((m) => m.id === makeId), [makeId]);
  const model = useMemo(
    () => make?.models.find((m) => m.id === modelId),
    [make, modelId]
  );

  const handleSearch = () => {
    if (partNumber.trim()) {
      alert(`부품번호 "${partNumber}" 검색 (Mock)`);
      return;
    }
    if (!makeId) {
      alert("차종을 선택해주세요");
      return;
    }
    const desc = [make?.name, model?.name, trim].filter(Boolean).join(" ");
    alert(`"${desc}" 호환 부품 검색 (Mock)`);
  };

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{
        background: "linear-gradient(135deg, rgba(204,0,0,0.08) 0%, var(--bg-card) 100%)",
        border: "1px solid rgba(204,0,0,0.2)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#CC0000] text-lg">📍</span>
        <h3 className="text-[15px] font-bold" style={{ color: "var(--text)" }}>
          차종으로 빠르게 찾기
        </h3>
        <span className="text-[11px] font-bold tracking-widest uppercase ml-auto" style={{ color: "var(--text-dim)" }}>
          Quick Search
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {/* Make */}
        <select
          value={makeId}
          onChange={(e) => {
            setMakeId(e.target.value);
            setModelId("");
            setTrim("");
          }}
          className="flex-1 rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            color: "var(--text)",
          }}
        >
          <option value="">제조사 선택</option>
          {vehicleMakes.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Model */}
        <select
          value={modelId}
          onChange={(e) => {
            setModelId(e.target.value);
            setTrim("");
          }}
          disabled={!make}
          className="flex-1 rounded-lg px-4 py-3 text-sm outline-none disabled:opacity-50"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            color: "var(--text)",
          }}
        >
          <option value="">모델 선택</option>
          {make?.models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Trim */}
        <select
          value={trim}
          onChange={(e) => setTrim(e.target.value)}
          disabled={!model}
          className="flex-1 rounded-lg px-4 py-3 text-sm outline-none disabled:opacity-50"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            color: "var(--text)",
          }}
        >
          <option value="">연식/트림 선택</option>
          {model?.trims.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-[#CC0000] text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#e00] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Search size={16} /> 호환 부품 보기
        </button>
      </div>

      {/* Or part number */}
      <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--divider)" }}>
        <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
          또는 부품번호로 바로 검색
        </span>
        <input
          type="text"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="P06064N, GDB1840 등"
          className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            color: "var(--text)",
          }}
        />
      </div>
    </div>
  );
}
