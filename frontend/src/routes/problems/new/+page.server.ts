import { db } from "$lib/server";
import { problemSchema, routingProblems, users } from '$lib/server/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from "drizzle-orm";
import { superValidate } from 'sveltekit-superforms/server';
import { v4 as uuidv4 } from 'uuid';
import type { Actions, PageServerData } from './$types';

export const load: PageServerData = async () => {
    const defaultForm = {
        depot: {
            address: "",
            coordinates: null
        },
        customers: [
            {
                name: "",
                location: {
                    address: "",
                    coordinates: null
                }
            }
        ]
    }
    const form = await superValidate(defaultForm, problemSchema);
    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, problemSchema);
        if (!form.valid) return fail(400, { form });

        const session = await locals.getSession();
        if (!session?.user?.email) return error(400)

        const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
        if (!user) return error(400)

        const problems = await db.insert(routingProblems).values({ id: uuidv4(), userId: user?.id, problem: form.data }).returning({ id: routingProblems.id });

        throw redirect(303, `/problems/${problems[0]?.id}`)
    }
};
