import type { Metadata } from "next";
import "@/styles/main.scss";


export const metadata: Metadata = {
  title: "holo-fi - play hololive lofi music",
  description: "A music player that plays relaxing music produced by Hololive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
