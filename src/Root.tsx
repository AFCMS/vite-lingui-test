import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import App from "./App";
import { bootstrapLocaleAtom, localeReadyAtom } from "./atoms";

export function Root() {
  const ready = useAtomValue(localeReadyAtom);
  const bootstrapLocale = useSetAtom(bootstrapLocaleAtom);

  useEffect(() => {
    void bootstrapLocale();
  }, [bootstrapLocale]);

  if (!ready) {
    return null;
  }

  return (
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  );
}
