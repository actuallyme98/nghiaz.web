const SEARCH_HISTORY_KEYWORD = 'search-history';
const CATEGORY_KEY = 'category-key';

export const setCategoryKey = () => {
  const key = Math.floor(Math.random() * 1e7);
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(key));
  return key;
};

export const getKeyCategory = () => {
  const dataStr = localStorage.getItem(CATEGORY_KEY);
  if (!dataStr) {
    return setCategoryKey();
  }
  const data = JSON.parse(dataStr);
  return parseInt(data);
};

export const removeCategoryKey = () => {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(0));
};

export const getSearchHistory = (): string[] => {
  try {
    const dataStr = localStorage.getItem(SEARCH_HISTORY_KEYWORD);
    if (dataStr) {
      const data = JSON.parse(dataStr);
      if (Array.isArray(data)) {
        return data;
      }
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const setSearchHistory = (keyword: string) => {
  try {
    keyword = keyword.toLocaleLowerCase();
    const keywords = getSearchHistory().filter((str) => str !== keyword);
    keywords.unshift(keyword);
    localStorage.setItem(SEARCH_HISTORY_KEYWORD, JSON.stringify(keywords));
  } catch (error) {
    // Don't need to handle
  }
};

export const removeSearchHistory = (keyword: string) => {
  try {
    const keywords = getSearchHistory().filter((str) => str !== keyword);
    localStorage.setItem(SEARCH_HISTORY_KEYWORD, JSON.stringify(keywords));
  } catch (error) {
    // Don't need to handle
  }
};
