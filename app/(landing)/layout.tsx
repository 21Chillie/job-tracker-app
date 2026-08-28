import Navbar from "@/components/navigation/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex flex-1 flex-col">
      <div className="p- mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <header className="px-6 pt-6">
          <Navbar />
        </header>

        <main className="my-6 flex-1 max-[1600px]:px-3">{children}</main>

        <footer className="px-6 py-10">Landing Footer</footer>
      </div>
    </div>
  );
}
