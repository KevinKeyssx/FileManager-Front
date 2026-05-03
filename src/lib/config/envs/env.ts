import { z } from "zod";
import { 
    BACKEND_URL, 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    BETTER_AUTH_SECRET, 
    BETTER_AUTH_URL,
    ADMIN_EMAIL
} from "$env/static/private";


const envSchema = z.object({
	BACKEND_URL          : z.url(),
    GOOGLE_CLIENT_ID     : z.string().min(1),
    GOOGLE_CLIENT_SECRET : z.string().min(1),
    BETTER_AUTH_SECRET   : z.string().min(1),
    BETTER_AUTH_URL      : z.url(),
    ADMIN_EMAIL          : z.email()
});


const parsed = envSchema.safeParse({
	BACKEND_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET,
    BETTER_AUTH_URL,
    ADMIN_EMAIL
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
    BETTER_AUTH_URL      : parsed.data.BETTER_AUTH_URL,
    ADMIN_EMAIL          : parsed.data.ADMIN_EMAIL
};
