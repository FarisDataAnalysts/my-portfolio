import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "700"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Muhammad Faris | Data Analyst & Financial Trainer",
  description:
    "Data Analyst, Bookkeeper & Trainer — Excel, SQL, Python, Power BI. Based in Karachi, Pakistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${space.variable} ${jetbrains.variable} ${inter.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
