import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizki Juliadi Portfolio",
  description: "Aspiring SOC Analyst | IEEE Published Researcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
