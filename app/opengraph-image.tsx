import { ImageResponse } from "next/og";

export const alt = "Sarthak Sighat: I connect people, technology and opportunity.";
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
        <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>I connect people,</div>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>technology and opportunity.</div>
          <div style={{ display: "flex", gap: 18, marginTop: 40 }}>
            {[
              ["#1E3FD8", "People."],
              ["#C8F135", "Products."],
              ["#000000", "Markets."],
              ["#9A968C", "Business."],
            ].map(([c, t]) => (
              <div key={t} style={{ display: "flex", flexDirection: "column", width: 240 }}>
                <div style={{ height: 10, background: c }} />
                <span style={{ fontSize: 40, fontWeight: 800, marginTop: 10 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
