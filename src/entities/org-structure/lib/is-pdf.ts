export const isPdf = (url: string): boolean => {
  return url.toLowerCase().endsWith(".pdf");
};