import { ImageResponse } from "next/og";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const alt = "Hetu Patel — Full-Stack Web Developer & Problem Solver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #060913 0%, #0b1329 55%, #0f1b34 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#38bdf8,#818cf8,#c084fc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {">_"}
          </div>
          <div style={{ display: "flex", color: "#7dd3fc", fontSize: 24, fontWeight: 600, letterSpacing: 2 }}>
            HETUPATEL.DEV
          </div>
        </div>

        <div style={{ display: "flex", color: "white", fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
          {PERSONAL_INFO.name}
        </div>

        <div style={{ display: "flex", marginTop: 18, color: "#38bdf8", fontSize: 40, fontWeight: 700 }}>
          Full-Stack Web Developer &amp; Problem Solver
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 48 }}>
          {["MERN", "Next.js", "React Native", "GenAI"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#e2e8f0",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
