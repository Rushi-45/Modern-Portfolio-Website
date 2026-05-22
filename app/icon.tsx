import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #00E5FF 0%, #4fd1c5 60%, #a78bfa 100%)",
          color: "#0a0a0a",
          fontWeight: 900,
          fontSize: 22,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 6,
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
