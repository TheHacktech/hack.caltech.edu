import { useEffect, useRef, type ReactNode } from 'react';
import { Dialog } from '../components/Dialog';

interface HomeDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  title: ReactNode;
  describedBy?: string;
  view?: string;
  children: ReactNode;
}

export function HomeDialog({
  id, open, onClose, closeLabel, title, describedBy, view, children,
}: HomeDialogProps) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) heading.current?.focus({ preventScroll: true });
  }, [open, view]);

  return (
    <Dialog id={id} className="home-dialog" open={open} onClose={onClose}
      labelledBy={id + '-title'} describedBy={describedBy}>
      <div className="dialog-panel">
        <header className="dialog-heading">
          <h2 id={id + '-title'} ref={heading} tabIndex={-1}>{title}</h2>
          <button type="button" className="dialog-close" aria-label={closeLabel} onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div key={view} className="dialog-body">{children}</div>
      </div>
    </Dialog>
  );
}
