import { NotFoundGlitch } from "@/components/motion/not-found/glitch";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col p-2.5">
      <Card className="bg-background grid flex-1 place-items-center p-6 ring-0!">
        <Card className="bg-card">
          <CardContent>
            <NotFoundGlitch
              description="The page you are looking for has been moved, vanished, or never existed."
              browseHref="https://github.com/21Chillie/job-tracker-app"
              browseLabel="Read our docs"
            />
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
