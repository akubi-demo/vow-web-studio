import { useSyncExternalStore } from 'react';

export type Lang = 'id' | 'en';
const KEY = 'vow-lang';
const listeners = new Set<() => void>();

function read(): Lang {
  try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'id'; } catch { return 'id'; }
}

export function setLang(lang: Lang) {
  try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  document.documentElement.lang = lang;
  listeners.forEach(l => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, read, () => 'id' as Lang);
  const t = (id: string, en: string) => (lang === 'en' ? en : id);
  return { lang, t };
}
