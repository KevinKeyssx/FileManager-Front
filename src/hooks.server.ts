import { redirect, type Handle } from "@sveltejs/kit";

import { ENVS } from "$lib/config/envs/env";
import { auth } from "$lib/server/auth";


export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Obtenemos la sesión para validar el acceso administrativo en todo el sitio
	const authSession   = await auth.api.getSession({ headers: event.request.headers });
	const user          = authSession?.user;
	const email         = user?.email;
	const isDashboard   = pathname.startsWith( "/dashboard" );

	// Validación de Administrador Único
	if ( authSession && email !== ENVS.ADMIN_EMAIL ) {
		// Si no es el admin, invalidamos la sesión para los locals y el renderizado del servidor
		event.locals.user    = null;
		event.locals.session = null;

		// Si el cliente (Header/useSession) pide la sesión, devolvemos null para limpiar la UI
		if ( pathname === "/api/auth/get-session" ) {
			return new Response( JSON.stringify( null ), {
				status  : 200,
				headers : { "Content-Type": "application/json" }
			} );
		}

		// Redirección si intenta acceder a rutas protegidas
		if ( isDashboard ) {
			throw redirect( 302, "/?error=unauthorized" );
		}
	} else {
		// Sesión válida o inexistente
		event.locals.user    = user ?? null;
		event.locals.session = authSession?.session ?? null;
	}

	// Rutas de Better Auth: permitimos que fluyan normalmente (login, callback, logout, etc)
	// get-session ya fue interceptado arriba si el usuario no era admin
	if ( pathname.startsWith( "/api/auth" ) && pathname !== "/api/auth/get-session" ) {
		return resolve( event );
	}

	// Protección de seguridad adicional para el Dashboard
	if ( isDashboard && !event.locals.session ) {
		throw redirect( 302, "/?error=unauthorized" );
	}

	return resolve( event );
};
