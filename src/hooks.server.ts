import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// get the cookie
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	// do nothing if no cookie is found
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	// load the session if a cookie is found
	const { session, user } = await lucia.validateSession(sessionId);
	// recover existing session if it exists
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// SvelteKit types are non-standard: you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	// create a new session if it doesn't
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	// set the locals and return
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};