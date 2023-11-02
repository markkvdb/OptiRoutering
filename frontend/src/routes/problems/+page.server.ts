import { db } from "$lib/server";
import { routingProblems, users } from '$lib/server/schema';
import { error } from '@sveltejs/kit';
import { eq } from "drizzle-orm";
import type { PageServerData } from "./$types";


export const load: PageServerData = async ({ locals }) => {
    const session = await locals.getSession();
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
    if (!user) return error(404, "User not found")

    const route_definitions = await db.query.routingProblems.findMany({ where: eq(routingProblems.userId, user.id) })

    return {
        route_definitions: route_definitions,
    };
}
