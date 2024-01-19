import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Spacer from "@/components/Spacer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BestBuy SKU Setup Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <Spacer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
