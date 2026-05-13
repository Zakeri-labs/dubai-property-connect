import { useParams } from "@tanstack/react-router";
import { fa } from "@/content/fa";
import { ar } from "@/content/ar";

export type Lang = "fa" | "ar";
export const LANGS: Lang[] = ["fa", "ar"];
export const DEFAULT_LANG: Lang = "fa";

export const dictionaries = { fa, ar } as const;
export type Dict = typeof fa;

export function isLang(v: string | undefined): v is Lang {
  return v === "fa" || v === "ar";
}

export function useLang(): Lang {
  const { lang } = useParams({ strict: false }) as { lang?: string };
  return isLang(lang) ? lang : DEFAULT_LANG;
}

export function useT(): { lang: Lang; t: Dict; dir: "rtl" } {
  const lang = useLang();
  return { lang, t: dictionaries[lang], dir: "rtl" };
}
