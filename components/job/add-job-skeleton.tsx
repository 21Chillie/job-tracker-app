"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddJobSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <Skeleton className="h-9 w-64 tracking-tight sm:h-4xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader className="border-b">
            <CardTitle>Application details</CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-sm" />
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 pt-6">
            <Skeleton className="h-5 w-24" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="my-5" />

            <Skeleton className="h-5 w-24" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="my-5" />

            <Skeleton className="h-5 w-32" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="my-5" />

            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-24 w-full" />

            <div className="mt-6 flex justify-end gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick stats</CardTitle>

              <CardDescription>
                <Skeleton className="h-4 w-full max-w-sm" />
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 pt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
