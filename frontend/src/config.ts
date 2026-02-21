const isServer = typeof window === "undefined";
const DEFAULT_LOCAL_API = "http://127.0.0.1:8000/api/v1";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || (isServer ? DEFAULT_LOCAL_API : "/api/v1");
