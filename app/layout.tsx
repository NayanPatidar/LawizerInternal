import "./globals.css";
import { AuthProvider } from "@/context/authContext";

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
