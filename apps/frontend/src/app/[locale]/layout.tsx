import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/shared/i18n/routing";
import { AppThemeProvider } from "@/shared/theme/ThemeProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "DentilFlow",
  description: "Dental clinic management system",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "ar" | "fr" | "en")) {
    notFound();
  }

  // Enable static rendering
  const messages = await getMessages();

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <AppThemeProvider direction={dir}>{children}</AppThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
