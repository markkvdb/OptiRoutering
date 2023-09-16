import { createServerClient } from '$lib/api';
import type { RouteDefinition } from '$lib/interfaces.js';
import { error, json } from "@sveltejs/kit";

export async function POST({ request, fetch }): Promise<{ body: RouteDefinition; status: number; }> {
    const route_definition: RouteDefinition = await request.json();
    const client = createServerClient(fetch);

    const response = await client.POST("/routes", {
        body: route_definition
    });

    if (response.error) {
        throw error(response.response.status, response.response.text());
    } else {
        return json(response.data, { status: 201 });
    }

}
