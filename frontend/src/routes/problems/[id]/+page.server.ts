import { error } from '@sveltejs/kit';
import { route_definitions } from '../data';

export function load({ params }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        throw error(400, "Invalid problem ID");
    }

    if (id >= route_definitions.length) {
        throw error(404);
    }

    const route_definition = route_definitions[id]

    return {
        route_definition
    };
}
