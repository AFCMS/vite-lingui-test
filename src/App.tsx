import { Trans, useLingui, Plural } from "@lingui/react/macro";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

import "./App.css";

import { changeLanguageAtom, languageAtom, localeLoadingAtom, type Languages } from "./atoms";

function App() {
  const { t } = useLingui();
  const [tt, setTT] = useState(1);
  const language = useAtomValue(languageAtom);
  const isLocaleLoading = useAtomValue(localeLoadingAtom);
  const changeLanguage = useSetAtom(changeLanguageAtom);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = e.target.value as Languages;

    void changeLanguage(nextLanguage);
  };

  return (
    <>
      <select value={language} onChange={handleLanguageChange} disabled={isLocaleLoading}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      <div>Language: {language}</div>
      <div className="button-group">
        <button onClick={() => setTT((t) => t - 1)}>-1</button>
        <button onClick={() => setTT((t) => t + 1)}>+1</button>
      </div>
      <div>TT: {tt}</div>

      <h2>{t`Hello, World!`}</h2>
      <h2>
        <Trans>Hello, World!</Trans>
      </h2>
      <h2>
        <Plural value={tt} one="One item" other="Many items" />
      </h2>
    </>
  );
}

export default App;
