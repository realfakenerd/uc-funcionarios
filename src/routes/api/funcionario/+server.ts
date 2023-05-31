import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const url = 'http://187.60.56.72:9191/funcionario'
export const GET = (async ({ fetch, setHeaders }) => {
    setHeaders({
        'cache-control': 'max-age=3600'
    })
    const res = await fetch(url);
    const data = (await res.json())

    return json(data);
}) satisfies RequestHandler;

export const PUT = (async ({request,fetch}) => {
    const body = await request.json();
    console.log(body)
    return json('body')
}) satisfies RequestHandler;