import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <svg viewBox="0 0 64 64" width="140" height="140">
          <g
            fill="none"
            stroke="#d4ff3a"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="32,8 54,21 54,43 32,56 10,43 10,21" />
            <line x1="32" y1="8" x2="32" y2="56" />
            <line x1="10" y1="21" x2="54" y2="43" />
            <line x1="54" y1="21" x2="10" y2="43" />
          </g>
          <circle cx="32" cy="32" r="3" fill="#d4ff3a" />
        </svg>
      </div>
    ),
    size,
  );
}
