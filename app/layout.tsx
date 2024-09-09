import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { FloatingLegalFooter } from "@/features/legal/FloatingLegalFooter";
import { NextTopLoader } from "@/features/page/NextTopLoader";
import { getServerUrl } from "@/lib/server-url";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import type { LayoutParams } from "@/types/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { type ReactNode } from "react";
import "./code-theme.scss";
import "./globals.scss";
import { Providers } from "./providers";
import { BlurredBackground } from "@/components/ui/BluredBackground";
import { LandingHeader } from "@/features/landing/LandingHeader";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  metadataBase: new URL(getServerUrl()),
};

export default function RootLayout({
  children,
  modal,
}: LayoutParams<{}> & { modal?: ReactNode }) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          <PlausibleProvider domain={SiteConfig.domain} />
        </head>
        <body
          suppressHydrationWarning
          className={cn(
            "h-full bg-background font-sans antialiased flex flex-col ",
            GeistMono.variable,
            GeistSans.variable,
          )}
        >
          <Providers>
            <NextTopLoader
              delay={100}
              showSpinner={false}
              color="hsl(var(--primary))"
            />
            <LandingHeader />

            <BlurredBackground imageUrl="https://cdnb.artstation.com/p/assets/images/images/015/582/603/large/artur-sadlos-leg-more-sh210-background-as-v002.jpg?1548866523" />
            <div className="relative flex grow gap-2 pt-16 text-foreground">
              <div className="relative size-full">
                {children} {modal}
              </div>
            </div>
            <TailwindIndicator />
            <FloatingLegalFooter />
            <Sidebar />
          </Providers>
        </body>
      </html>
    </>
  );
}
