import { NotFoundGlitch } from "@/components/motion/not-found/glitch";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="p-2.5 bg-secondary/50 min-h-screen w-screen relative flex flex-col">
      <Card className="ring-0! bg-background flex-1 grid place-items-center p-6">
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
