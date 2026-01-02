export type UserRole = "ADMIN" | "TRAVELER";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: [
    "/my-profile",
    "/my-plans",
    "/change-password",
    "/payment/success",
    "/payment/fail",
    "/payment/cancel",
    "/setting",
  ],
  patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

export const travelerProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoutes = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isRoutesMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  if (routes.patterns.some((pattern: RegExp) => pattern.test(pathname))) {
    return true;
  }
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "TRAVELER" | "COMMON" | null => {
  if (isRoutesMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRoutesMatches(pathname, travelerProtectedRoutes)) {
    return "TRAVELER";
  }

  if (isRoutesMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoutes = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "TRAVELER") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
) => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};