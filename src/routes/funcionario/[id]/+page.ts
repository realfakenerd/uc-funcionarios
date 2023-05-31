import type { Funcionario } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const res = await fetch('/api/funcionario/' + params.id);
	const data = (await res.json()) as Funcionario;

	return {
		funcionario: data
	};
}) satisfies PageLoad;
