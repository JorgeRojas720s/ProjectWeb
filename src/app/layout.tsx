import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import ContactButtons from "@/components/ContactButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContextProvider  from "../components/ContextProvider";
import Image from "next/image";
import { logo } from "../images/Icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SukDicc",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <Image alt='logo' className="logo hidden sm:block" src={logo}></Image>
          <Header></Header>
        </header>
        <ContactButtons />
        <WhatsAppButton />
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
