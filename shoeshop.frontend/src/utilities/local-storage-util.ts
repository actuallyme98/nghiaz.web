const SEARCH_HISTORY_KEYWORD = 'search-history';

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
    const keywords = getSearchHistory().filter(str => str !== keyword);
    keywords.unshift(keyword);
    localStorage.setItem(SEARCH_HISTORY_KEYWORD, JSON.stringify(keywords));
  } catch (error) {
    // Don't need to handle
  }
};

export const removeSearchHistory = (keyword: string) => {
  try {
    const keywords = getSearchHistory().filter(str => str !== keyword);
    localStorage.setItem(SEARCH_HISTORY_KEYWORD, JSON.stringify(keywords));
  } catch (error) {
    // Don't need to handle
  }
};