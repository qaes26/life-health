import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata = {
  title: "دليل قيس الطبي | Qais Medical Guide",
  description: "نصائح طبية موثوقة في صحة المرأة، الأسنان، التغذية، والإسعافات الأولية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <Navbar />
        <main style={{ minHeight: "80vh", paddingBottom: "2rem" }}>
          {children}
        </main>
        <Disclaimer />
        <Footer />
      </body>
    </html>
  );
}
