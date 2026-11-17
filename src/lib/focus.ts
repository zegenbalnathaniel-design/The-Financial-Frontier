// Tiny cross-component bus: anything (Story of the Day, ⌘K palette) can ask the homepage
// globe to fly to a country. Off the homepage we navigate to /#globe-XX instead.
export const FOCUS_EVENT = "ff:focus-country";

export function focusCountry(code: string, router?: { push: (href: string) => void }) {
  if (typeof window === "undefined") return;
  if (document.getElementById("globe")) {
    window.dispatchEvent(new CustomEvent(FOCUS_EVENT, { detail: code }));
  } else if (router) {
    router.push(`/#globe-${code}`);
  } else {
    window.location.href = `/#globe-${code}`;
  }
}
