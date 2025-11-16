import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumit Srivastava | DevOps Engineer & Cloud Architect",
  description: "Head of DevOps at Invideo. Specializing in cloud infrastructure, Kubernetes, AWS, GCP, and building scalable solutions. DevOps insights and technical blog.",
  keywords: ["DevOps", "Cloud Infrastructure", "Kubernetes", "AWS", "GCP", "Platform Engineering", "SRE"],
  authors: [{ name: "Sumit Srivastava" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://timusri.github.io",
    siteName: "Sumit Srivastava",
    title: "Sumit Srivastava | DevOps Engineer & Cloud Architect",
    description: "DevOps insights, cloud infrastructure guides, and technical writing on Kubernetes, AWS, and scalable systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Srivastava | DevOps Engineer",
    description: "DevOps insights and cloud infrastructure guides",
    creator: "@timus__",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
