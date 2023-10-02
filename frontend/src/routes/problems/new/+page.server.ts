import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerData } from './$types';

const locationSchema = z.object({
    address: z.string(),
    coordinates: z.object({
        lat: z.number(),
        lng: z.number()
    })
});

const problemSchema = z.object({
    depot: locationSchema,
    customers: z.object({
        name: z.string(),
        location: locationSchema,
    }).array(),
});

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
    default: async ({ request, params }) => {
        const form = await superValidate(request, problemSchema);
        if (!form.valid) return fail(400, { form });
    }
};
