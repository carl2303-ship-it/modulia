import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { InstallPrompt } from "@/components/InstallPrompt";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2d5a3d",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://moduliahome.com"),
  title: "Modulia | Maisons Modulaires",
  description:
    "Modulia — maisons modulaires durables, personnalisables et prêtes à vivre. Nous construisons votre avenir, module par module.",
  keywords: ["maisons modulaires", "habitation modulaire", "construction durable", "Modulia"],
  applicationName: "Modulia",
  appleWebApp: {
    capable: true,
    title: "Modulia",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Modulia | Maisons Modulaires",
    description: "Maisons modulaires durables, personnalisables et prêtes à vivre.",
    type: "website",
    locale: "fr_FR",
    siteName: "Modulia",
    images: [{ url: "/icon-512x512.png", width: 512, height: 512, alt: "Modulia" }],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32x32.png"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} font-ui antialiased`}
      >
        {children}
        <Footer />
        <InstallPrompt />
      </body>
    </html>
  );
}
