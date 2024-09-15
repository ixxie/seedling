import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$types";

import { initDb } from '$lib/server/db'

initDb()

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
	if (!event.locals.user && !(['/login', '/join'].includes(event.url.pathname))) {
		return redirect(302, "/login");
	}
	return {
		user: event.locals.user
	};
};
