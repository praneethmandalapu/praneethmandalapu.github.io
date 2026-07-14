import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praneeth Reddy Mandalapu — Machine learning & automation",
  description:
    "Computer science undergraduate at UC Santa Cruz building reliable, data-driven systems — from LLM evaluation and benchmark design to telemetry models for electric racecars.",
};

export const viewport: Viewport = {
  themeColor: "#121110",
};

const themeInit = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="ivory"&&t!=="onyx")t="onyx";d.dataset.theme=t;var m=localStorage.getItem("motion");if(m!=="on"&&m!=="off"){m=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on";}d.dataset.motion=m;}catch(e){d.dataset.theme="onyx";d.dataset.motion="on";}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="onyx"
      data-motion="on"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
