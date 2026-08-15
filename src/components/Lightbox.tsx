"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Image lightbox for technical figures.
 *
 * Progressive enhancement: figures are rendered as plain server-side markup
 * carrying `data-lightbox` attributes, and this listener upgrades them to
 * open a full-resolution overlay. Without JS the page is unaffected.
 *
 * Uses a native <dialog>, so focus trapping, inertness of the page behind,
 * and Escape-to-close come from the platform rather than hand-rolled
 * keyboard handling. The full-resolution source is loaded only on open.
 */
type Shot = { src: string; alt: string; caption?: string };

export default function Lightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<Shot | null>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-lightbox]",
      );
      if (!target) return;
      const src = target.dataset.lightbox;
      if (!src) return;
      event.preventDefault();
      setShot({
        src,
        alt: target.dataset.lightboxAlt ?? "",
        caption: target.dataset.lightboxCaption || undefined,
      });
      dialogRef.current?.showModal();
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Clear the source after closing so the next open starts clean.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setShot(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Enlarged figure"
      onClick={(e) => {
        // Close when the backdrop (the dialog element itself) is clicked.
        if (e.target === dialogRef.current) close();
      }}
      className="lightbox"
    >
      {shot && (
        <figure className="mx-auto flex h-[100dvh] w-[min(96vw,1500px)] flex-col items-center justify-center p-3 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution
              original by design; Next's optimiser would re-encode and cap it. */}
          <img
            src={shot.src}
            alt={shot.alt}
            className="max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-sm bg-panel object-contain"
          />
          {shot.caption && (
            <figcaption className="mt-3 max-w-3xl text-center font-mono text-xs leading-relaxed text-paper">
              {shot.caption}
            </figcaption>
          )}
          <button
            type="button"
            onClick={close}
            autoFocus
            className="mt-3 rounded-sm border border-paper/30 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper/10"
          >
            Close (Esc)
          </button>
        </figure>
      )}
    </dialog>
  );
}
