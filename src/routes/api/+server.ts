import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
    return json('Hello UC Technology do Brasil')
}) satisfies RequestHandler