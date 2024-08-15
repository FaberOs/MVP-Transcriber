/* import { Nunito } from "next/font/google"; */
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Nextjs Tests",
};

/* const NunitoSans = Nunito({
  weight: ["300", "400", "500", "600"],
  styles: ["italic", "normal"],
  subsets: ["latin"],
}); */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body /* className={NunitoSans.className} */>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
