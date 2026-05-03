import { createAuthClient } from "better-auth/svelte";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL as string;


export const authClient = createAuthClient({
    baseURL : FRONTEND_URL
});

export const { signIn, signOut, useSession } = authClient;
