import type { Funcionario } from '../lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/funcionario');
	const data = (await res.json()) as Funcionario[];

	return {
		funcionarios: data
	};
}) satisfies PageLoad;
