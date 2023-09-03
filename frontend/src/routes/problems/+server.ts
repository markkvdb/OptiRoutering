import { json } from '@sveltejs/kit';
import { route_definitions } from './data';

export async function POST({ request }): Promise<{ body: any; status: number; }> {
    const route_definition = await request.json();
    route_definitions.push(route_definition);

    return json(route_definition, { status: 201 });
}
