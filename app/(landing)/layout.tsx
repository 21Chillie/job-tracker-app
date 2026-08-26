import Navbar from "@/components/navigation/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col p-6 xl:px-0">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <header>
          <Navbar />
        </header>

        <main className="my-6 flex-1">{children}</main>

        <footer>Landing Footer</footer>
      </div>
    </div>
  );
}
