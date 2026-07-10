import { createClient } from "@supabase/supabase-js";
//#region src/lib/supabase.ts
var _SUPABASE_URL_DEFAULT = "https://dwezesrukmwygqnmefbz.supabase.co";
var _SUPABASE_ANON_KEY_DEFAULT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw";
function resolveEnv(key) {
	try {
		const val = Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/lms",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw",
			"PUBLIC_SUPABASE_URL": "https://dwezesrukmwygqnmefbz.supabase.co",
			"SITE": "https://lop12.com",
			"SSR": true
		}, {
			SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDEzMDQ2MiwiZXhwIjoyMDk1NzA2NDYyfQ.0UQgz6eHfhwrO6p3N0pPeOGhxLfFkhZzfMdekHyy-HE",
			PUBLIC: "C:\\Users\\Public"
		})?.[key];
		if (val && val !== "undefined") return val;
	} catch {}
	try {
		const proc = globalThis["process"];
		if (proc?.env?.[key]) return proc.env[key];
	} catch {}
	return "";
}
var supabase = createClient(Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/lms",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw",
	"PUBLIC_SUPABASE_URL": "https://dwezesrukmwygqnmefbz.supabase.co",
	"SITE": "https://lop12.com",
	"SSR": true
}, {
	SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDEzMDQ2MiwiZXhwIjoyMDk1NzA2NDYyfQ.0UQgz6eHfhwrO6p3N0pPeOGhxLfFkhZzfMdekHyy-HE",
	PUBLIC: "C:\\Users\\Public"
}).PUBLIC_SUPABASE_URL || _SUPABASE_URL_DEFAULT, Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/lms",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw",
	"PUBLIC_SUPABASE_URL": "https://dwezesrukmwygqnmefbz.supabase.co",
	"SITE": "https://lop12.com",
	"SSR": true
}, {
	SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDEzMDQ2MiwiZXhwIjoyMDk1NzA2NDYyfQ.0UQgz6eHfhwrO6p3N0pPeOGhxLfFkhZzfMdekHyy-HE",
	PUBLIC: "C:\\Users\\Public"
}).PUBLIC_SUPABASE_ANON_KEY || _SUPABASE_ANON_KEY_DEFAULT, { auth: {
	persistSession: true,
	autoRefreshToken: true
} });
function createServerSupabase() {
	return createClient(resolveEnv("PUBLIC_SUPABASE_URL") || _SUPABASE_URL_DEFAULT, resolveEnv("PUBLIC_SUPABASE_ANON_KEY") || _SUPABASE_ANON_KEY_DEFAULT, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
function createAdminSupabase() {
	const url = resolveEnv("PUBLIC_SUPABASE_URL") || _SUPABASE_URL_DEFAULT;
	const anonKey = resolveEnv("PUBLIC_SUPABASE_ANON_KEY") || _SUPABASE_ANON_KEY_DEFAULT;
	const svcKey = resolveEnv("SUPABASE_SERVICE_ROLE_KEY");
	if (!svcKey || svcKey.includes("placeholder")) {
		console.warn("[createAdminSupabase] No service role key — falling back to anon client. RLS applies.");
		return createClient(url, anonKey, { auth: {
			persistSession: false,
			autoRefreshToken: false
		} });
	}
	return createClient(url, svcKey, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
function isMockModeForEnv() {
	const url = resolveEnv("PUBLIC_SUPABASE_URL") || _SUPABASE_URL_DEFAULT;
	const key = resolveEnv("PUBLIC_SUPABASE_ANON_KEY") || _SUPABASE_ANON_KEY_DEFAULT;
	return !url || !key;
}
//#endregion
export { supabase as a, resolveEnv as i, createServerSupabase as n, isMockModeForEnv as r, createAdminSupabase as t };
