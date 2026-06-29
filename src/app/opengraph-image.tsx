import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
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
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1100px 600px at 18% 18%, rgba(212,255,58,0.18), transparent 60%), radial-gradient(900px 700px at 90% 90%, rgba(91,43,255,0.30), transparent 60%), #0a0a0b",
          color: "#f4f4f2",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7a7a74",
            }}
          >
            tomiwaphilip.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#d4ff3a",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#d4ff3a",
                boxShadow: "0 0 24px #d4ff3a",
              }}
            />
            settlement engine
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 28, color: "#c8c8c2", letterSpacing: -0.2 }}>
            {site.role}
          </div>
          <div
            style={{
              fontSize: 124,
              lineHeight: 0.95,
              letterSpacing: -4,
              fontWeight: 600,
              maxWidth: 1050,
            }}
          >
            Tomiwa <span style={{ color: "#d4ff3a", fontStyle: "italic" }}>Philip</span>
          </div>
          <div style={{ fontSize: 32, color: "#c8c8c2", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 26,
            fontSize: 22,
            color: "#c8c8c2",
            fontFamily: "monospace",
          }}
        >
          <span>100k+ tx/day</span>
          <span style={{ color: "#5b2bff" }}>·</span>
          <span>1,000+ businesses</span>
          <span style={{ color: "#5b2bff" }}>·</span>
          <span>9 years</span>
          <span style={{ color: "#5b2bff" }}>·</span>
          <span>AI + Web3</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
