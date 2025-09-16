import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../hooks/useAuth";

export const metadata: Metadata = {
  title: "AbsStore - Your Fashion Destination",
  description: "Discover the latest trends in fashion with AbsStore. Quality clothing for every style.",
  icons: {
    icon: [
      { url: "/assets/x-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/x-icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/assets/x-icon.png",
    apple: "/assets/x-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
