import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/toaster";

export const metadata: Metadata = {
  title: "Runas e Ferro | Mesa SaaS",
  description: "Plataforma full-stack para jogar Runas e Ferro com sala em tempo real e IA."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="main-layout">
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
