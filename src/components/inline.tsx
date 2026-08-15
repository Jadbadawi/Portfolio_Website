import type { ReactNode } from "react";

/**
 * Minimal inline formatting for data-file copy: `**bold**` and `` `code` ``.
 * Deliberately not a Markdown parser, just the two spans the project data
 * actually uses.
 *
 * There is no italic span on purpose. Body copy across the site is set
 * upright; emphasis is carried by weight and by wording instead.
 */
export function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-line/50 px-1 py-0.5 font-mono text-[0.86em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
