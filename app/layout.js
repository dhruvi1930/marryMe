import Header from "@/components/layouts/Header";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
