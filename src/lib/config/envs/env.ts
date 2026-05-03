import { z } from "zod";
import { 
    BACKEND_URL, 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    BETTER_AUTH_SECRET, 
    BETTER_AUTH_URL 
} from "$env/static/private";

const envSchema = z.object({
	BACKEND_URL          : z.string().url(),
    GOOGLE_CLIENT_ID     : z.string().min(1),
    GOOGLE_CLIENT_SECRET : z.string().min(1),
    BETTER_AUTH_SECRET   : z.string().min(1),
    BETTER_AUTH_URL      : z.string().url()
});

const parsed = envSchema.safeParse({
	BACKEND_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET,
    BETTER_AUTH_URL
});

if ( !parsed.success ) {
	console.error( "❌ Invalid environment variables:", parsed.error.format() );
	throw new Error( "Invalid environment variables" );
}

export const ENVS = {
	BACKEND_URL          : parsed.data.BACKEND_URL,
    GOOGLE_CLIENT_ID     : parsed.data.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : parsed.data.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET   : parsed.data.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL      : parsed.data.BETTER_AUTH_URL
};
