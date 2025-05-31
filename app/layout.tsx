import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MassioHealth",
  description: "Simple and accurate BMI calculator using your height and weight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
