import "../globals.css";
import NavBar from "../components/navBar/navbar";
import BottomNav from "../components/navBar/bottomNav";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gradient-to-r from-[#EEEEEE] to-[#D5EBD8]">
        <NavBar />
        <div className="flex-1 pt-16 pb-24">
          <main>{children}</main>
        </div>
        <div className="mt-auto hidden w-full lg:block">
          <Footer />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
