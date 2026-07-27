import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="kicker">404</p>
      <h1 className="h-display mt-5 text-4xl">This page isn&rsquo;t in the archive</h1>
      <p className="mt-3 max-w-md text-muted">The report you&rsquo;re looking for may not have been published yet.</p>
      <Link href="/reports" className="btn-primary mt-8">Browse all reports</Link>
    </div>
  );
}
