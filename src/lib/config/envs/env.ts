import { z } from "zod";
import { BACKEND_URL } from "$env/static/private";

const envSchema = z.object({
	BACKEND_URL : z.string().url()
});

const parsed = envSchema.safeParse({
	BACKEND_URL
});

if ( !parsed.success ) {
	console.error( "❌ Invalid environment variables:", parsed.error.format() );
	throw new Error( "Invalid environment variables" );
}

export const ENVS = {
	BACKEND_URL : parsed.data.BACKEND_URL
};
