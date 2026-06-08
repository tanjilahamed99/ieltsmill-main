import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootProvider from "../Providers/Provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ← text visible immediately
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // ← text visible immediately
});

export const metadata = {
  title: "IELTS-MILL",
  description: "Improve your self by IELTS-MILL",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <RootProvider>
          {children}
          <Toaster position="top-center" richColors />
        </RootProvider>
      </body>
    </html>
  );
}
