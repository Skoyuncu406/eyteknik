import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "EY Teknik Metal | Mühendislik ve Metal Çözümleri",
    template: "%s | EY Teknik Metal",
  },
  description:
    "EY Teknik Metal; LED aydınlatma, dekoratif metal, elektrik panoları, rack kabinetler ve kablo taşıma sistemlerinde profesyonel çözümler sunar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${outfit.variable} ${jakarta.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
