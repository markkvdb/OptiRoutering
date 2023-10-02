import { error, fail } from '@sveltejs/kit';
import { eq } from "drizzle-orm";
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { db } from "$lib/server";
import { updateUserSchema, users } from "$lib/server/schema";

export const load: PageServerLoad = async ({ params }) => {
    const user = (await db.select().from(users).where(eq(users.id, params.id)))[0];

    if (!user) throw error(404, 'User not found.');

    // If user is null, default values for the schema will be returned.
    const form = await superValidate({ name: user.name }, updateUserSchema);
    return { form };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, updateUserSchema);
        if (!form.valid) return fail(400, { form });

        // Find user
        const user = (await db.select().from(users).where(eq(users.id, params.id)))[0]
        if (!user) throw error(404, 'User not found.');

        // Update user
        await db.update(users).set({ name: form.data.name }).where(eq(users.id, params.id));

        return message(form, 'User updated!');
    }
};
