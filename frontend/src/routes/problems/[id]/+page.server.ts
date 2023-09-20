import { createServerClient } from '$lib/api';
import type { components } from '$lib/api/v1';
import { error } from '@sveltejs/kit';

export const ssr = false;

interface ProblemPageData {
    route_definition: components["schemas"]["RouteDefinition"];
}

export async function load({ params, fetch }): Promise<ProblemPageData> {
    const client = createServerClient(fetch);
    const route_definition = await client.GET("/routes/{id}", {
        params: {
            path: {
                id: parseInt(params.id)
            }
        }
    });

    if (route_definition.error) {
        if (route_definition.response.status === 404) {
            throw error(route_definition.response.status, "Route not found");
        } else {
            throw new Error("Unknown error")
        }
    }


    return {
        route_definition: route_definition.data,
    };
}

