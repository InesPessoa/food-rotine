import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yummy - Your Food Management App",
  description: "Plan your meals, manage your groceries, and discover new recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
