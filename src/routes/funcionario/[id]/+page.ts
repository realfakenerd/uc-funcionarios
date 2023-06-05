import type { FuncionarioDB } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const res = await fetch('/api/funcionario/' + params.id);
	const data = (await res.json()) as FuncionarioDB;

	return {
		funcionario: data.Item
	};
}) satisfies PageLoad;
