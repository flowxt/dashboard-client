import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard Client",
  description: "Tableau de bord pour vos sites web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
