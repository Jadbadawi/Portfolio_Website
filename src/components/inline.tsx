import type { ReactNode } from "react";

/**
 * Minimal inline formatting for data-file copy: **bold**, *italic* and
 * `code`. Deliberately not a Markdown parser — just the three spans the
 * project data actually uses.
 */
export function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
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
