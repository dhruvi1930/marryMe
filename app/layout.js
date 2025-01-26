import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
