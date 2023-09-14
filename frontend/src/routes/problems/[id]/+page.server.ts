import { createServerClient } from '$lib/api';

export async function load({ params, fetch }) {
    const client = createServerClient(fetch);
    const route_definition = await client.GET("/routes/{id}", {
        params: {
            path: {
                id: params.id
            }
        }
    });


    return {
        route_definition: {
            data: route_definition.data,
            error: route_definition.error,
        },
    };
}
