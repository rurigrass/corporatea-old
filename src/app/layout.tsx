import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/auth/Providers";

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <Providers>
        <body className="min-h-screen pt-12 bg-slate-50 antialiased">
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
