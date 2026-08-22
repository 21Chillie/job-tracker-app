import Navbar from "@/components/navigation/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-4 xl:px-0">
      <header>
        <Navbar />
      </header>

      <main className="my-6 flex-1">{children}</main>

      <footer>Landing Footer</footer>
    </div>
  );
}
