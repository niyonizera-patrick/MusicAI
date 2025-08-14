import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["600","700"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "MuseAI",
  description: "Compose • Learn • Jam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="text-white font-inter">{children}</body>
    </html>
  );
}
