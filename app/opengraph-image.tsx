import { ImageResponse } from "next/og";

export const alt = "Sarthak Sighat: I make money move. I make music move. I make things happen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F1EDE2", padding: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#2B2B2E" }}>
          <span style={{ fontWeight: 700 }}>Sarthak Sighat</span>
          <span style={{ color: "#1E3FD8" }}>88.0 Mumbai</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 1, color: "#000", letterSpacing: -3 }}>
          {[
            ["#1E3FD8", "I make money move."],
            ["#C8F135", "I make music move."],
            ["#2B2B2E", "I make things happen."],
          ].map(([c, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div style={{ width: 64, height: 36, background: c }} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
