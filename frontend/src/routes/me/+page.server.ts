import { error, fail } from '@sveltejs/kit';
import { eq } from "drizzle-orm";
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { db } from "$lib/server";
import { updateUserSchema, users } from "$lib/server/schema";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession();
    if (!session?.user?.email) throw error(400);

    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })

    if (!user) throw error(404, 'User not found.');

    // If user is null, default values for the schema will be returned.
    const form = await superValidate({ name: user.name }, updateUserSchema);
    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, updateUserSchema);
        if (!form.valid) return fail(400, { form });

        // Find user
        const session = await locals.getSession();
        if (!session?.user?.email) return error(400);

        // Update user
        await db.update(users).set(form.data).where(eq(users.email, session?.user?.email));

        return message(form, 'User updated!');
    }
};
