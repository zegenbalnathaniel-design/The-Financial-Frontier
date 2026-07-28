import { memo } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
type Policy = { tightening: string[]; easing: string[]; holding: string[] };
const cols = [
  { key: "tightening", label: "Tightening", Icon: ArrowUp, color: "text-neg", ring: "border-neg/25 bg-neg/[0.06]" },
  { key: "holding", label: "Holding", Icon: Minus, color: "text-muted", ring: "border-white/10 bg-white/[0.03]" },
  { key: "easing", label: "Easing", Icon: ArrowDown, color: "text-pos", ring: "border-pos/25 bg-pos/[0.06]" },
] as const;
function PolicyDivergence({ policy }: { policy: Policy }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cols.map(({ key, label, Icon, color, ring }) => (
        <div key={key} className={`rounded-xl border p-4 ${ring}`}>
          <p className={`flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest ${color}`}>
            <Icon size={14} aria-hidden />{label}
          </p>
          <ul className="mt-3 space-y-2">
            {policy[key].length === 0 && <li className="text-sm text-muted2">None this month</li>}
            {policy[key].map((n) => <li key={n} className="text-sm text-body">{n}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default memo(PolicyDivergence);
