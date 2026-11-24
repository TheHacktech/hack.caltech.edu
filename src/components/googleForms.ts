import { useRef, useState } from 'react';

const base = 'https://docs.google.com/forms/d/e';
export const googleForm = (id: string) => ({
  respond: `${base}/${id}/viewform`,
  submit: `${base}/${id}/formResponse`,
});

export function mapFormFields(data: FormData, fields: Readonly<Record<string, string>>) {
  const entries = new URLSearchParams();
  for (const [name, id] of Object.entries(fields)) {
    for (const value of data.getAll(name)) entries.append(id, String(value).trim());
  }
  entries.set('fvv', '1');
  entries.set('pageHistory', '0');
  return entries;
}

export function prefillForm(url: string, entries: URLSearchParams) {
  const link = new URL(url);
  link.searchParams.set('usp', 'pp_url');
  for (const [name, value] of entries) {
    if (name.startsWith('entry.') && !name.endsWith('_sentinel')) {
      link.searchParams.append(name, value);
    }
  }
  return link.href;
}

export type Submission = 'idle' | 'sending' | 'sent' | 'error';

export function useGoogleForm(action: string) {
  const [state, setState] = useState<Submission>('idle');
  const pending = useRef(false);

  async function submit(entries: URLSearchParams) {
    if (pending.current) return;
    pending.current = true;
    setState('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      // Google's public responder endpoint returns an opaque response. A fetch
      // that resolves indicates dispatch, but cannot verify Google's storage.
      await fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        body: entries,
        signal: controller.signal,
      });
      setState('sent');
    } catch {
      setState('error');
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
    }
  }

  return { state, submit };
}
