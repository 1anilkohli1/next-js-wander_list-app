import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elsewhere — places calling your name",
  description:
    "A growing collection of someday-soons, saved for the days when you're ready to wander.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
