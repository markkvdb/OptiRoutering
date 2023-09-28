import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";
import { db } from "$lib/server";
import EmailProvider from "@auth/core/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle = SvelteKitAuth(async (event) => {
    const authOptions = {
        adapter: DrizzleAdapter(db),
        providers: [
            EmailProvider({
                server: {
                    host: SMTP_HOST,
                    port: SMTP_PORT,
                    auth: {
                        user: SMTP_USER,
                        pass: SMTP_PASSWORD
                    }
                },
                from: EMAIL_FROM
            }),
        ],
        secret: "abc",
        trustHost: true
    };
    return authOptions;
}) satisfies Handle;
