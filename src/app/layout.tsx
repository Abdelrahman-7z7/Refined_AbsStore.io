import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../hooks/useAuth";

export const metadata: Metadata = {
  title: "AbsStore - Your Fashion Destination",
  description: "Discover the latest trends in fashion with AbsStore. Quality clothing for every style.",
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
