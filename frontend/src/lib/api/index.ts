import type { ServerLoadEvent } from "@sveltejs/kit";
import createClient from "openapi-fetch";
import type { paths } from "./v1";

const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
export default client;

export const createServerClient = (fetcher: ServerLoadEvent["fetch"]) =>
    createClient<paths>({
        baseUrl: "http://127.0.0.1:8000",
        fetch: fetcher,
    });
