export const pathUrl = (url?: string) => {
  url = url?.trim();
  if (!url) {
    return '';
  }

  return 'http://localhost:5000/admin/static/' + url;
};
