import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0f1729 50%, #1a0f2e 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#00E5FF",
              boxShadow: "0 0 20px #00E5FF",
            }}
          />
          <div style={{ color: "#a3a3a3", fontSize: 26, letterSpacing: 0.5 }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 28,
            letterSpacing: -1.5,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            background: "linear-gradient(120deg, #60a5fa, #4fd1c5, #a78bfa, #f472b6)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -0.5,
          }}
        >
          {siteConfig.jobTitle}
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#a3a3a3",
            marginTop: 40,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span>React.js</span>
          <span style={{ color: "#4a4a4a" }}>·</span>
          <span>Next.js</span>
          <span style={{ color: "#4a4a4a" }}>·</span>
          <span>TypeScript</span>
          <span style={{ color: "#4a4a4a" }}>·</span>
          <span>Framer Motion</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 70,
            right: 90,
            fontSize: 22,
            color: "#666",
            letterSpacing: 1,
          }}
        >
          {`${siteConfig.location.city.toUpperCase()}, ${siteConfig.location.country}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
