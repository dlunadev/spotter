import { useMemo } from "react";
import * as Localization from "expo-localization";
import { countries as countriesData } from "countries-list";
import isoCountries from "i18n-iso-countries";

// Importar idiomas comunes
import en from "i18n-iso-countries/langs/en.json";
import es from "i18n-iso-countries/langs/es.json";
import fr from "i18n-iso-countries/langs/fr.json";
import pt from "i18n-iso-countries/langs/pt.json";
import de from "i18n-iso-countries/langs/de.json";

isoCountries.registerLocale(en);
isoCountries.registerLocale(es);
isoCountries.registerLocale(fr);
isoCountries.registerLocale(pt);
isoCountries.registerLocale(de);

interface Country {
  code: string;
  name: string;
  codeNumber: string;
  flag: string;
  capital?: string;
  continent?: string;
  languages?: string[];
  phone: string;
}

export const useCountries = () => {
  const userLang = Localization.getLocales?.()[0]?.languageCode ?? "es";

  const countryList: Country[] = useMemo(() => {
    const translatedNames = isoCountries.getNames(userLang, { select: "official" });

    return Object.entries(countriesData).map(([code, data]) => {
      const phone =
        Array.isArray(data.phone) ? data.phone[0]?.toString() ?? "" : data.phone ?? "";

      const translatedName = translatedNames[code] || data.name;

      return {
        code,
        name: translatedName,
        codeNumber: `+${phone}`,
        flag: `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
        capital: data.capital,
        continent: data.continent,
        languages: data.languages,
        phone,
      };
    }).filter(c => c.codeNumber !== "+N/A" && c.phone !== "");
  }, [userLang]);

  return { countries: countryList };
};
