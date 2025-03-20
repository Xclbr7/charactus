import localFont from "next/font/local";
import "./globals.css";
import PersonaContextProvider from './chatroom/context/PersonaContextProvider';
import DetailsContextProvider from "./chatroom/context/DetailsContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Charactus",
  description: "Your hub for AI characters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DetailsContextProvider>
        <PersonaContextProvider>
        {children}
        </PersonaContextProvider>
        </DetailsContextProvider>
      </body>
    </html>
  );
}
