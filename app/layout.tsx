import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="p-0 m-0 bg-black text-white">
        <div className="container-box-[600px] pt-5 flex flex-col gap-5">
          <Link href={"/"}>
            <h1 className="text-(--color-soft-red) font-extrabold">
              ONEBITE CINEMA
            </h1>
          </Link>
          {children}
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
