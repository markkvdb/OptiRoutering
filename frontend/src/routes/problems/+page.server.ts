import { createServerClient } from '$lib/api';
import type { components } from '$lib/api/v1';

interface ProblemPageData {
    route_definitions: components["schemas"]["RouteDefinition"][] | undefined;
}

export async function load({ fetch }): Promise<ProblemPageData> {
    const client = createServerClient(fetch);
    const route_definitions = await client.GET("/routes", {});

    if (route_definitions.response.status === 500) {
        throw new Error("Unknown error");
    }

    return {
        route_definitions: route_definitions.data,
    };
}
