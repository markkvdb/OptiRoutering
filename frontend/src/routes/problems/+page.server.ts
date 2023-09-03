import type { RouteDefinition } from '$lib/interfaces';
import { route_definitions } from './data';

interface ProblemPageData {
    route_definitions: RouteDefinition[];
}

export function load(): ProblemPageData {
    return {
        route_definitions: route_definitions
    };
}
