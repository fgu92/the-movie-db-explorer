import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Liste des locales supportées
  locales: ["en", "fr"],

  // Locale par défaut
  defaultLocale: "en",
});

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
