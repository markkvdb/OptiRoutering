
import { createServerClient } from '$lib/api';
import { db } from "$lib/server";
import { routingProblems } from '$lib/server/schema';
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { Actions, PageServerData } from "./$types";

export const load: PageServerData = async ({ params }) => {
    const routingProblem = await db.query.routingProblems.findFirst({ where: eq(routingProblems.id, params.id) })

    if (!routingProblem) throw error(404, "Problem not found")

    return {
        routing_problem: routingProblem,
    };
}

export const actions = {
    solve: async ({ params }) => {
        const routingProblem = await db.query.routingProblems.findFirst({ where: eq(routingProblems.id, params.id) })
        if (!routingProblem) throw error(404, "Problem not found")

        const client = createServerClient(fetch);
        const response = await client.POST('/solve', {
            body: routingProblem.problem
        });

        if (response.error) {
            throw new Error("Unknown error")
        }

        return {
            body: response.data,
            status: 200
        };
    }
} satisfies Actions;
