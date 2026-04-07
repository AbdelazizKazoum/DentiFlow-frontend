export function formatCurrency(
  amount: number,
  locale: string,
  currency: string = "DZD",
): string {
  try {
    // Locale fallback for formatting DZD nicely (e.g. using Arabic digits or French conventions)
    const currencyFormatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return currencyFormatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${amount} ${currency}`;
  }
}

export function formatDate(
  date: Date | string | number,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
      throw new Error("Invalid date");
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const dateFormatter = new Intl.DateTimeFormat(
      locale,
      options || defaultOptions,
    );
    return dateFormatter.format(d);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

export function formatTime(
  date: Date | string | number,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
      throw new Error("Invalid date");
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const timeFormatter = new Intl.DateTimeFormat(
      locale,
      options || defaultOptions,
    );
    return timeFormatter.format(d);
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
}
