import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Lawizer",
  description:
    "Lawizer Internal Expert Panel. Secure platform for advocates and internal experts to manage consultations, cases, and client interactions.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans overflow-x-hidden `}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
