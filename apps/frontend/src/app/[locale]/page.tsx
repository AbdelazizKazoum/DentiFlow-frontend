import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations();

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold">{t("app.title")}</h1>

      <div className="flex gap-4">
        {/* Placeholder locale switcher and sign-in links */}
        <select className="border rounded p-2" defaultValue="fr">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign In
        </button>
      </div>
    </div>
  );
}
