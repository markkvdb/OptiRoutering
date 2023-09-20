import { createServerClient } from '$lib/api';
import { error, json } from "@sveltejs/kit";

export async function POST({ params, fetch }): Promise<{ body: number[]; status: number; }> {
    const client = createServerClient(fetch);
    const response = await client.POST('/routes/{id}/solve', {
        params: { path: { id: params.id } }
    });

    if (response.error) {
        if (response.response.status === 404) {
            throw error(response.response.status, "Route not found");
        } else {
            throw new Error("Unknown error")
        }
    }

    return json(response.data, { status: 200 });
}
