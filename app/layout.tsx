import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@wrksz/themes/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jobtracker.chillie.my.id"),
  title: "Job Tracker — Track your job application process in one place.",
  description:
    "Web dashboard for job seekers to manage and track their job application process in one place.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          storage="cookie"
          defaultTheme="dark"
          disableTransitionOnChange>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
