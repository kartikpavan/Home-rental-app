export const DEV_URL = "http://localhost:5000" as const;

export const PROD_URL = "production-endpoint" as const;

export const API_URL = import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;
