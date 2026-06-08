import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { dynamicActivate } from "./locale";

export type Languages = "en" | "fr";

export const languageAtom = atomWithStorage<Languages>("language:v1", "en");

export const localeLoadingAtom = atom(false);
export const localeReadyAtom = atom(false);

export const bootstrapLocaleAtom = atom(null, async (get, set) => {
  const locale = get(languageAtom);

  set(localeLoadingAtom, true);

  try {
    await dynamicActivate(locale);
    set(localeReadyAtom, true);
  } finally {
    set(localeLoadingAtom, false);
  }
});

export const changeLanguageAtom = atom(
  null,
  async (get, set, nextLanguage: Languages) => {
    if (nextLanguage === get(languageAtom)) {
      return;
    }

    set(localeLoadingAtom, true);

    try {
      const activated = await dynamicActivate(nextLanguage);

      if (activated) {
        set(languageAtom, nextLanguage);
      }
    } finally {
      set(localeLoadingAtom, false);
    }
  },
);
