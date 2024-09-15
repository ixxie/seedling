import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { hash } from "@node-rs/argon2";
import { SqliteError } from "better-sqlite3";

import { initDb } from "$lib/server/db";
import { generateId } from "$lib/server/id";

const db = initDb()

import type { Actions, PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	if (event.locals.user) {
		return redirect(302, "/");
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('Signing user up')
		const formData = await event.request.formData();
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		console.log(`Signing user '${username}' up`)
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		const userId = generateId(15);

		try {
			db.prepare(`--sql
                insert into account 
                    (id, username, email, password_hash) 
                values (?, ?, ?, ?)
            `).run(
				userId,
				username,
				email,
				passwordHash
			);

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		} catch (e) {
			if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
				return fail(400, {
					message: "Username already used"
				});
			}
			console.error(e)
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
		return redirect(302, "/");
	}
};