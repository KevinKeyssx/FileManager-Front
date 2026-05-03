import { betterAuth } from "better-auth";
import { ENVS } from "$lib/config/envs/env";

export const auth = betterAuth({
    socialProviders : {
        google : {
            clientId     : ENVS.GOOGLE_CLIENT_ID,
            clientSecret : ENVS.GOOGLE_CLIENT_SECRET,
            mapUser: async (user: any, _account: any) => {
                return user;
            }
        }
    },
    user: {
        additionalFields: {
            role: {
                type        : 'string',
                defaultValue: 'ADMIN',
                required    : false
            }
        }
    },
    advanced: {
        cookiePrefix: 'file-manager'
    },

    // Configuraciones de entorno explícitas
    secret : ENVS.BETTER_AUTH_SECRET,
    baseURL : ENVS.BETTER_AUTH_URL
});
