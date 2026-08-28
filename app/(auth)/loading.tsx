import { Loader } from "@/components/motion/loader";

export default function AuthLoading() {
  return (
    <div className="max-sm:bg-background mx-auto flex w-full flex-1 flex-col p-2.5 max-sm:p-4">
      <main className="bg-background relative grid flex-1 place-items-center rounded-2xl max-sm:bg-transparent sm:shadow-sm">
        <div className="grid w-full max-w-md place-items-center gap-4">
          <Loader variant="spinner" className="text-primary" />
        </div>
      </main>
    </div>
  );
}
