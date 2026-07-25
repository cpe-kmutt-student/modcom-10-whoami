const dictionaries = {
  th: () => import("../../messages/th.json").then((module) => module.default),
  en: () => import("../../messages/en.json").then((module) => module.default),
};

type langList = "th" | "en";

export const getDictionary = async (locale: langList) => {
  return await dictionaries[locale]?.() ?? await dictionaries.th();
};
