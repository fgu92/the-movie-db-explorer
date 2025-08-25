import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // List of supported locales
  locales: ["en", "fr"],
  // Default locale
  defaultLocale: "en",
});
export const config = {
  // Matcher for all routes except static files
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
