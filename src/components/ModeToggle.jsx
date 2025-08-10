import React from 'react';

/**
 * Segmented control to switch between annual and project modes.
 * @param {{mode: 'annual'|'project', onChange: (mode:'annual'|'project')=>void}} props
 */
export default function ModeToggle({ mode, onChange }) {
  return (
    <div role="group" aria-label="Modo de cálculo" className="flex rounded-md overflow-hidden border border-[var(--border)]">
      <button
        type="button"
        aria-pressed={mode === 'annual'}
        onClick={() => onChange('annual')}
        className={`px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
          mode === 'annual' ? 'bg-[var(--brand)] text-white' : 'bg-[var(--panel)]'
        }`}
      >
        Modo Anual
      </button>
      <button
        type="button"
        aria-pressed={mode === 'project'}
        onClick={() => onChange('project')}
        className={`px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
          mode === 'project' ? 'bg-[var(--brand)] text-white' : 'bg-[var(--panel)]'
        }`}
      >
        Modo Proyecto
      </button>
    </div>
  );
}
