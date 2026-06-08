import { useAtomValue, useSetAtom } from "jotai";
import { t } from "@lingui/core/macro";
import { useState } from "react";

import "./App.css";

import {
  changeLanguageAtom,
  languageAtom,
  localeLoadingAtom,
  type Languages,
} from "./atoms";

function App() {
  const [tt, setTT] = useState(0);
  const language = useAtomValue(languageAtom);
  const isLocaleLoading = useAtomValue(localeLoadingAtom);
  const changeLanguage = useSetAtom(changeLanguageAtom);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = e.target.value as Languages;

    void changeLanguage(nextLanguage);
  };

  return (
    <>
      <select
        value={language}
        onChange={handleLanguageChange}
        disabled={isLocaleLoading}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      <div>Language: {language}</div>
      <button onClick={() => setTT((t) => t + 1)}>+1</button>
      <div>TT: {tt}</div>

      <h2>{t`Hello, World!`}</h2>
    </>
  );
}

export default App;
