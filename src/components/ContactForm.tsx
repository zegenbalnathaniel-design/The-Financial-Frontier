"use client";
import { useState } from "react";
import { Check, Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", topic: "Question", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });
  async function submit() {
    if (!form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700)); // replace with a real POST — see README
    setStatus("sent");
  }
  const field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-muted2 focus:border-emerald/50 focus:outline-none";
  if (status === "sent") return (
    <div className="glass flex min-h-[26rem] flex-col items-center justify-center p-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald/15 text-emerald"><Check size={22} /></span>
      <p className="h-display mt-5 text-xl">Message sent</p>
      <p className="mt-2 max-w-xs text-sm text-muted">Thanks — we&rsquo;ll reply to {form.email || "your inbox"} soon.</p>
      <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", topic: "Question", message: "" }); }} className="mt-6 text-sm text-emerald hover:underline">Send another</button>
    </div>
  );
  return (
    <div className="glass p-8"><div className="space-y-5">
      <div><label htmlFor="name" className="block text-sm text-ink">Name</label><input id="name" value={form.name} onChange={set("name")} className={`${field} mt-2`} placeholder="Your name" /></div>
      <div><label htmlFor="email" className="block text-sm text-ink">Email</label><input id="email" type="email" required value={form.email} onChange={set("email")} className={`${field} mt-2`} placeholder="you@example.com" /></div>
      <div><label htmlFor="topic" className="block text-sm text-ink">Topic</label><select id="topic" value={form.topic} onChange={set("topic")} className={`${field} mt-2`}><option>Question</option><option>Correction</option><option>Story tip</option><option>Something else</option></select></div>
      <div><label htmlFor="message" className="block text-sm text-ink">Message</label><textarea id="message" required rows={5} value={form.message} onChange={set("message")} className={`${field} mt-2 resize-none`} placeholder="What's on your mind?" /></div>
      <button onClick={submit} disabled={status === "sending" || !form.email || !form.message} className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">{status === "sending" ? "Sending…" : "Send message"}{status !== "sending" && <Send size={15} />}</button>
      <p className="text-xs leading-relaxed text-muted2">This form isn&rsquo;t connected to a backend yet. See README.md to wire it to your own endpoint.</p>
    </div></div>
  );
}
