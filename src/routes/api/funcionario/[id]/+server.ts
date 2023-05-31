import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ params, fetch }) => {
    const res = await fetch('http://187.60.56.72:9191/funcionario/' + params.id);
    const data = (await res.json())
    return json(data)
}) satisfies RequestHandler;

export const DELETE = (async ({ params, fetch }) => {
    const res = await fetch('http://187.60.56.72:9191/funcionario/' + params.id, {
        method: 'DELETE'
    });

    const data = await res.json()

    return json(data)
}) satisfies RequestHandler