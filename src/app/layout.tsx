"use client"

//import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import { Suspense } from "react";
import Loading from "./loading";

import { ClerkProvider } from "@clerk/nextjs";
import { CashFlowProvider } from "@/context/cashflow-context";
//import { TotalRLDetailContext } from "@/context/total-rl-detail";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const dynamic = "force-dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "GDPS-App V1",
//   description: "GSDEV",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>



      <html lang="en">

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <Suspense fallback={<Loading />}>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>

                <AppSidebar />
                {/* <SidebarTrigger /> */}
                <CashFlowProvider>
                  <QueryClientProvider client={queryClient}>
                    {children}
                  </QueryClientProvider>
                </CashFlowProvider>


              </SidebarProvider>
            </ThemeProvider>
          </Suspense>
        </body>


      </html >
    </ClerkProvider>

  );
}
