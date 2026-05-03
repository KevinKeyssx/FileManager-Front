import { auth } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";


export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if ( pathname.startsWith( '/api/auth' )) return resolve( event );

	const authSession = await auth.api.getSession({ headers: event.request.headers });

	const user          = authSession?.user;
	const isDashboard	= pathname.startsWith( '/dashboard' );

	event.locals.user		= user ?? null;
	event.locals.session	= authSession?.session ?? null;

	if ( isDashboard && !authSession ) {
		throw redirect( 302, '/' );
	}

	return resolve( event );
};
