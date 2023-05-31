import type { Funcionario } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const res = await fetch('http://187.60.56.72:9191/funcionario/' + params.id);
	const data = (await res.json()) as Funcionario;

	return {
		funcionario: data
	};
}) satisfies PageLoad;
