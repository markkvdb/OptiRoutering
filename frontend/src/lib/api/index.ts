import { env } from '$env/dynamic/private';
import type { ServerLoadEvent } from "@sveltejs/kit";
import createClient from "openapi-fetch";
import type { paths } from "./v1";

const client = createClient<paths>({ baseUrl: env.BACKEND_URL });
export default client;

export const createServerClient = (fetcher: ServerLoadEvent["fetch"]) =>
    createClient<paths>({
        baseUrl: env.BACKEND_URL,
        fetch: fetcher,
    });
