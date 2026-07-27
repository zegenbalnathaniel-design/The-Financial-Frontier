import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact — The Financial Frontier", description: "Questions, corrections and story tips." };

export default function ContactPage() {
  return (
    <div className="shell py-20"><div className="grid gap-16 lg:grid-cols-2">
      <div>
        <Reveal><p className="kicker">Contact</p><h1 className="h-display mt-5 text-4xl sm:text-5xl">Get in touch</h1>
        <p className="mt-5 max-w-md text-lg text-muted">Spotted an error, want to suggest a story, or have a question about something in a report? We read everything.</p></Reveal>
        <Reveal delay={0.1}><dl className="mt-12 space-y-8">
          <div><dt className="font-display text-sm font-semibold text-emerald">Corrections</dt><dd className="mt-1 text-sm text-muted">If a figure is wrong, tell us. We publish corrections on the report page itself.</dd></div>
          <div><dt className="font-display text-sm font-semibold text-emerald">Story tips</dt><dd className="mt-1 text-sm text-muted">Working on something the world economy should know about? Send it over.</dd></div>
          <div><dt className="font-display text-sm font-semibold text-emerald">Publication schedule</dt><dd className="mt-1 text-sm text-muted">A new report at the start of each month, covering the month just past.</dd></div>
        </dl></Reveal>
      </div>
      <Reveal delay={0.06}><ContactForm /></Reveal>
    </div></div>
  );
}
