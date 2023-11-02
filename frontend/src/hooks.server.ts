import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";
import { db } from "$lib/server";
import EmailProvider from "@auth/core/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

async function authorization({ event, resolve }) {
    // Protect any routes under /authenticated
    if (event.url.pathname !== '/' && !event.url.pathname.startsWith('/auth')) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, '/');
        }
    }

    return resolve(event);
}

export const handle = sequence(
    SvelteKitAuth(async (event) => {
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
    }) satisfies Handle,
    authorization
);

