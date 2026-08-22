import ButtonLink from "@/components/navigation/button-link";

export default function Hero() {
  return (
    <section className="bg-card relative isolate overflow-hidden rounded-3xl border px-6 pt-20 pb-32 text-center shadow-sm">
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--border) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 35%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Bottom glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(95% 75% at 50% 118%, color-mix(in oklch, var(--primary) 80%, transparent) 0%, transparent 70%)",
            // Dark Pattern
            // "radial-gradient(32% 28% at 0% 100%, color-mix(in oklch, var(--foreground) 90%, transparent) 0%, transparent 70%)",
            // "radial-gradient(32% 28% at 100% 100%, color-mix(in oklch, var(--foreground) 90%, transparent) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Headline */}
      <h1 className="text-foreground/90 mx-auto mt-12 max-w-4xl text-3xl tracking-tight text-pretty sm:text-4xl md:text-7xl">
        The simple way
        <strong className="from-foreground/90 via-foreground/70 block bg-linear-to-r to-[color-mix(in_oklch,var(--primary)_85%,var(--foreground))] bg-clip-text font-medium text-transparent">
          manage your applications
        </strong>
      </h1>

      {/* Subtext */}
      <p className="text-muted-foreground mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty sm:text-base">
        Dashboard for job seekers to manage and track their job application
        process in one place.
      </p>

      {/* CTA */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <ButtonLink
          className="bg-foreground! text-background! hover:bg-foreground/85! transition-colors"
          size="lg"
          href="/sign-up">
          Get started
        </ButtonLink>

        <ButtonLink
          className="hover:bg-background!"
          variant="ghost"
          size="lg"
          href="https://github.com/21Chillie/job-tracker-app"
          target="_blank">
          Documentation
        </ButtonLink>
      </div>
    </section>
  );
}
