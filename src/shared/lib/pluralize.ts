/**
 * Склоняет слова в зависимости от числа (для русского языка)
 * @param number - число
 * @param one - форма для 1 (например, "сотрудник")
 * @param few - форма для 2-4 (например, "сотрудника")
 * @param many - форма для 5+ (например, "сотрудников")
 * @returns правильная форма слова
 */
export const pluralize = (
    number: number,
    one: string,
    few: string,
    many: string,
  ): string => {
    const n = Math.abs(number);
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return many;
    }
  
    if (lastDigit === 1) {
      return one;
    }
  
    if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    }
  
    return many;
  };